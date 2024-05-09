import { Controller, Sse, UseGuards } from '@nestjs/common';
// import { Request } from 'express';
import { Observable, fromEvent, map } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { eventData } from './models/eventData';
// import { AdminGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role, UserEntity } from 'src/auth/entities/user.entity';
import { User } from '../auth/user.decorator';

@Controller('sseController')
export class SSEController {
  constructor(private eventEmitter: EventEmitter2) {}
  @UseGuards(JwtAuthGuard)
  @Sse('sse')
  sse(@User() SubscribedUser: UserEntity): Observable<MessageEvent> {
    // const user: UserEntity = req.user as UserEntity; // retrieving the user from the header
    // const userId = SubscribedUser.id;
    return fromEvent(this.eventEmitter, 'persist-cv').pipe(
      map((data: eventData) => {
        // the data contains the user who did the operation and the operation type
        // console.log(data);
        if (SubscribedUser.id == data.user.id) {
          return new MessageEvent('persist-cv-notification', {
            data: `you just ${data.operation} a cv`,
          });
        }
        if (
          SubscribedUser.role == Role.Admin &&
          SubscribedUser.id != data.user.id
        ) {
          return new MessageEvent('persist-cv-notification', {
            data: `a user just ${data.operation} a cv`,
          });
        }
      }),
    );
  }
}
