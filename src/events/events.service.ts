import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { EventEntity } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class EventsService extends CrudService<EventEntity> {
  constructor(
    @InjectRepository(EventEntity)
    eventsRepository: Repository<EventEntity>,
  ) {
    super(eventsRepository);
  }
}
