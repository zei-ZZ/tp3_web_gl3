import { Module } from '@nestjs/common';
import { SSEController } from './sse.controller';
import { SseService } from './sse.service';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [AuthModule],
  controllers: [SSEController],
  providers: [SseService],
    exports: [SseService],
})
export class SseModule {}
