import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CvEntity } from 'src/cvs/entities/cv.entity';
import { AuthService } from 'src/auth/auth.service';
import { eventData } from './entities/eventData';

@Injectable()
export class SseService {
  constructor(
    private eventEmitter: EventEmitter2,
    private authService: AuthService,
  ) {}

  async emit(op: string, cv: CvEntity) {
    const user = await this.authService.findOne(cv.user.id);
    const data: eventData = { user: user, operation: op };
    this.eventEmitter.emit('persist-cv', data);
    return { result: 'ok' };
  }
}
