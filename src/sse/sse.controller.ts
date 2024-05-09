import { Controller, Sse, UseGuards } from '@nestjs/common';
import { Observable, fromEvent, map, filter } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { eventData } from './models/eventData';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role, UserEntity } from 'src/auth/entities/user.entity';
import { User } from '../auth/user.decorator';

@Controller('sse')
export class SSEController {
  constructor(private eventEmitter: EventEmitter2) {}
  @UseGuards(JwtAuthGuard)
  @Sse()
  sse(@User() SubscribedUser: UserEntity): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'persist-cv').pipe(
      filter((data: eventData) => {
        // Filter out events that don't match any condition
        return (
          SubscribedUser.id == data.user.id ||
          (SubscribedUser.role == Role.Admin &&
            SubscribedUser.id != data.user.id)
        );
      }),
      map((data: eventData) => {
        const notificationData = {
          message: '',
          onCV: data.cv,
        };
        if (SubscribedUser.id == data.user.id) {
          return new MessageEvent('persist-cv-notification', {
            data: {
              ...notificationData,
              message: `you just ${data.operation} a cv`,
            },
          });
        }
        if (SubscribedUser.role == Role.Admin) {
          return new MessageEvent('persist-cv-notification', {
            data: {
              ...notificationData,
              message: `a user just ${data.operation} a cv`,
              byUser: data.user,
            },
          });
        }
      }),
    );
  }
}
