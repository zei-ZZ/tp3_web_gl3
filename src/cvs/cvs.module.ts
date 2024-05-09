import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CvsController } from './cvs.controller';
import { CvEntity } from './entities/cv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvsV2Controller } from './cvs.v2.controller';
import { AuthMiddleware } from '../auth/auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { SseModule } from 'src/sse/sse.module';

@Module({
  imports: [TypeOrmModule.forFeature([CvEntity]), AuthModule,SseModule],
  controllers: [CvsController, CvsV2Controller],
  providers: [CvsService],
})
export class CvsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CvsV2Controller);
  }
}
