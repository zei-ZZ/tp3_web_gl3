import { Module } from '@nestjs/common';
import { SseController } from './sse.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SseController],
})
export class SseModule {}
