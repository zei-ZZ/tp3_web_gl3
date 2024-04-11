import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from './entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity])],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
