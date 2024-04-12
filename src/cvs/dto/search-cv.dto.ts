import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { SearchDto } from '../../common/dto/search.dto';

export class SearchCvDto extends SearchDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  criterion?: string;
}
