import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { SearchCvDto } from './dto/search-cv.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUploadOptions } from '../file-upload';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { Role, UserEntity } from '../auth/entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventType } from '../events/entities/event.entity';
import { CreateEventDto } from '../events/dto/create-event.dto';

@Controller({
  path: 'cvs',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class CvsController {
  constructor(
    private readonly cvsService: CvsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', fileUploadOptions))
  async create(
    @Body() createCvDto: CreateCvDto,
    @User() user: UserEntity,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    createCvDto.user = user;
    createCvDto.path = file?.filename;

    const cv = await this.cvsService.create(createCvDto);

    this.eventEmitter.emit(EventType.ADD, {
      user,
      cv,
      type: EventType.ADD,
    } as CreateEventDto);

    return cv;
  }

  @Get()
  findAllBy(@Query() searchCvDto: SearchCvDto, @User() user: UserEntity) {
    const { id, role } = user;

    return this.cvsService.findAllBy(
      searchCvDto,
      role !== Role.Admin ? id : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvsService.findOne(id, {
      skills: true,
    });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', fileUploadOptions))
  async update(
    @Param('id') id: string,
    @Body() updateCvDto: UpdateCvDto,
    @User() user: UserEntity,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    updateCvDto.path = file?.filename;

    await this.cvsService.update(id, updateCvDto);

    const cv = await this.cvsService.findOne(id, { user: true, skills: true });

    this.eventEmitter.emit(EventType.UPDATE, {
      user,
      cv,
      type: EventType.UPDATE,
    } as CreateEventDto);

    return cv;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: UserEntity) {
    const cv = await this.cvsService.findOne(id, { user: true, skills: true });

    const result = this.cvsService.remove(id);

    this.eventEmitter.emit(EventType.DELETE, {
      user,
      cv,
      type: EventType.DELETE,
    } as CreateEventDto);

    return result;
  }
}
