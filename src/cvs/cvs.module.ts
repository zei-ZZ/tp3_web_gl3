import { Module } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CvsController } from './cvs.controller';
import { CvEntity } from './entities/cv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvsV2Controller } from './cvs.v2.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CvEntity])],
  controllers: [CvsController, CvsV2Controller],
  providers: [CvsService],
})
export class CvsModule {}
