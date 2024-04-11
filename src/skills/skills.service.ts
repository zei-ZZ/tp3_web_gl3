import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud/crud.service';
import { SkillEntity } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SkillsService extends CrudService<SkillEntity> {
  constructor(
    @InjectRepository(SkillEntity)
    skillsRepository: Repository<SkillEntity>,
  ) {
    super(skillsRepository);
  }
}
