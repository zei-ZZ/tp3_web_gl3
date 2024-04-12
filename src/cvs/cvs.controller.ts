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
import { fileUploadOptions } from 'src/file-upload';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';
import { Role, UserEntity } from 'src/auth/entities/user.entity';

@Controller({
  path: 'cvs',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class CvsController {
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
  findAllBy(@Query() searchCvDto: SearchCvDto, @User() user: UserEntity) {
    const { id, role } = user;

    return this.cvsService.findAllBy(
      searchCvDto,
      role !== Role.Admin ? id : undefined,
    );
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
