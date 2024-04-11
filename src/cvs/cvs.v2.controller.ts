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
  Version,
} from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { SearchCvDto } from './dto/search-cv.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUploadOptions } from 'src/file-upload';

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
    @UploadedFile() file?: Express.Multer.File,
  ) {
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
    @UploadedFile() file?: Express.Multer.File,
  ) {
    updateCvDto.path = file?.filename;

    return this.cvsService.update(id, updateCvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvsService.remove(id);
  }
}
