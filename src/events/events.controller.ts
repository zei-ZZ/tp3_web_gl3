import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { SearchDto } from '../common/dto/search.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(@Query() searchDto: SearchDto) {
    return this.eventsService.findAll(searchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }
}
