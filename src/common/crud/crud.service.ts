import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { Entity } from '../interfaces/entity.interface';
import { SearchDto } from '../dto/search.dto';
import { Pagination } from '../dto/pagination.dto';

export abstract class CrudService<TEntity extends Entity> {
  constructor(protected readonly repository: Repository<TEntity>) {}

  create(createEntityDto: DeepPartial<TEntity>): Promise<TEntity> {
    return this.repository.save(createEntityDto);
  }

  async findAll(
    searchDto: SearchDto,
    where?: FindOptionsWhere<TEntity> | FindOptionsWhere<TEntity>[],
  ): Promise<Pagination<TEntity>> {
    const { take, skip } = { take: 10, skip: 0, ...searchDto };

    const [data, count] = await this.repository.findAndCount({
      where,
      take,
      skip,
    });

    return {
      data,
      count,
    };
  }

  async findOne(id: string): Promise<TEntity> {
    const entity = await this.repository.findOneBy({ id: id as any });
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }

  async update(
    id: string,
    updateEntityDto: DeepPartial<TEntity>,
  ): Promise<TEntity> {
    const entity = await this.repository.preload({ id, ...updateEntityDto });
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }

  async remove(id: string): Promise<DeleteResult> {
    const result = await this.repository.delete(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
    return result;
  }
}
