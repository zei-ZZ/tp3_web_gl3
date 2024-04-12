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
} from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { SearchCvDto } from './dto/search-cv.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUploadOptions } from '../file-upload';
import { UserEntity } from '../auth/entities/user.entity';
import { User } from '../auth/user.decorator';

@Controller({
  path: 'cvs',
  version: '2',
})
export class CvsV2Controller {
  constructor(private readonly cvsService: CvsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', fileUploadOptions))
  create(
    @Body() createCvDto: CreateCvDto,
    @User() user: UserEntity,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    createCvDto.user = user;
    createCvDto.path = file?.filename;

    return this.cvsService.create(createCvDto);
  }

  @Get()
  findAllBy(@Query() searchCvDto: SearchCvDto) {
    return this.cvsService.findAllBy(searchCvDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', fileUploadOptions))
  update(
    @Param('id') id: string,
    @Body() updateCvDto: UpdateCvDto,
    @User() user: UserEntity,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    updateCvDto.path = file?.filename;

    return this.cvsService.updateOwned(id, updateCvDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserEntity) {
    return this.cvsService.removeOwned(id, user.id);
  }
}
