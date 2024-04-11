import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class SearchDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  take?: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  skip?: number;
}
