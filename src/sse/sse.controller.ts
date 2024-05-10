import { Controller, Sse, UseGuards } from '@nestjs/common';
import { Observable, fromEvent, map, filter } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role, UserEntity } from 'src/auth/entities/user.entity';
import { User } from '../auth/user.decorator';
import { CV } from '../events/entities/event.entity';
import { CreateEventModel } from '../events/model/create-event.model';

@Controller('sse')
@UseGuards(JwtAuthGuard)
export class SseController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Sse()
  sse(@User() SubscribedUser: UserEntity): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, `${CV}.*`).pipe(
      filter((event: CreateEventModel) => {
        // Filter out events that don't match any condition
        return (
          SubscribedUser.role === Role.Admin ||
          SubscribedUser.id === event.cv.user.id
        );
      }),
      map((event: CreateEventModel) => {
        return new MessageEvent(`${CV}.notification`, {
          data: event,
        });
      }),
    );
  }
}
