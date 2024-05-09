import {
  Controller,
  Req,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, fromEvent, map } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { eventData } from './entities/eventData';
import { AdminGuard } from 'src/auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role, UserEntity } from 'src/auth/entities/user.entity';

@Controller('sseController')
export class SSEController {
  constructor(
    private eventEmitter: EventEmitter2,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Sse('sse')
  sse(@Req() req: Request): Observable<MessageEvent> {
    const user: UserEntity = req.user as UserEntity; // retrieving the user from the header
    const userId = user.id;
    return fromEvent(this.eventEmitter, 'persist-cv').pipe(
      map((data: eventData) => { // the data contains the user who did the operation and the operation type
        if (userId == data.user.id) {
          return new MessageEvent('persist-cv-notification', {
            data: `you just ${data.operation} a cv`,
          });
        } else if (user.role == Role.Admin) {
          return new MessageEvent('persist-cv-notification', {
            data: `a user just ${data.operation} a cv`,
          });
        }
      }),
    );
  }

 
}
