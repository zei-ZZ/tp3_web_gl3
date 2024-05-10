import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateEventModel } from './model/create-event.model';
import { CV } from './entities/event.entity';
import { EventsService } from './events.service';

@Injectable()
export class EventListener {
  constructor(private readonly eventsService: EventsService) {}
  @OnEvent(`${CV}.*`)
  handleEverything(createEventModel: CreateEventModel) {
    return this.eventsService.create(createEventModel);
  }
}
