import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateEventDto } from './dto/create-event.dto';
import { CV } from './entities/event.entity';
import { EventsService } from './events.service';

@Injectable()
export class EventListener {
  constructor(private readonly eventsService: EventsService) {}
  @OnEvent(`${CV}.*`)
  async handleEverything(payload: CreateEventDto) {
    console.log(
      'EventListener.handleEverything',
      payload.cv.id,
      payload.type,
      'associated user :',
      payload.user.id,
    );
    return this.eventsService.create(payload);
  }
}
