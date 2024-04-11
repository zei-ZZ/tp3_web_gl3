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

  findAllBy(searchCvDto: SearchCvDto): Promise<Pagination<CvEntity>> {
    const { age, criterion } = searchCvDto;

    const where = [];

    if (age != null) {
      where.push({ age });
    }

    if (criterion != null) {
      const like = Like(`%${criterion}%`);
      const fields: (keyof CvEntity)[] = ['firstname', 'name', 'job'];

      where.push(...fields.map((field) => ({ [field]: like })));
    }

    return this.findAll(searchCvDto, where);
  }
}
