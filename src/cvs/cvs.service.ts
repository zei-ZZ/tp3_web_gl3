import { Injectable } from '@nestjs/common';
import { CvEntity } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../common/crud/crud.service';
import { Like, Repository } from 'typeorm';
import { SearchCvDto } from './dto/search-cv.dto';
import { Pagination } from 'src/common/dto/pagination.dto';

@Injectable()
export class CvsService extends CrudService<CvEntity> {
  constructor(
    @InjectRepository(CvEntity)
    cvsRepository: Repository<CvEntity>,
  ) {
    super(cvsRepository);
  }

  findAllBy(
    searchCvDto: SearchCvDto,
    id?: string,
  ): Promise<Pagination<CvEntity>> {
    const { age, criterion } = searchCvDto;

    const condition = id ? { user: { id } } : null;

    const where = [];

    if (age != null) {
      where.push({ age, ...condition });
    }

    if (criterion != null) {
      const like = Like(`%${criterion}%`);
      const fields: (keyof CvEntity)[] = ['firstname', 'name', 'job'];

      where.push(...fields.map((field) => ({ [field]: like, ...condition })));
    }

    if (where.length === 0 && condition) {
      where.push(condition);
    }

    return this.findAll(searchCvDto, where);
  }
}
