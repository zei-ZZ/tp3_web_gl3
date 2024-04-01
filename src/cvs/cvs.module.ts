import { Module } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CvsController } from './cvs.controller';

@Module({
  controllers: [CvsController],
  providers: [CvsService],
})
export class CvsModule {}
