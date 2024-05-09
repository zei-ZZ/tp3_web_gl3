import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { eventData } from './models/eventData';

@Injectable()
export class SseService {
  constructor(private eventEmitter: EventEmitter2) {}

  async emit(op: string, payload: any) {
    const data: eventData = {
      cv: payload.cv,
      user: payload.user,
      operation: op,
    };
    this.eventEmitter.emit('persist-cv', data);
    return { result: 'ok' };
  }
}
