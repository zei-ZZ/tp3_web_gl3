import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CvsModule } from './cvs/cvs.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [UsersModule, CvsModule, SkillsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
