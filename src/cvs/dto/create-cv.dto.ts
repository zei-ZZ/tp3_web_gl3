import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { SkillEntity } from '../../skills/entities/skill.entity';

const CIN_LENGTH = 8;

export class CreateCvDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  age: number;

  @IsNumberString()
  @IsNotEmpty()
  @Length(CIN_LENGTH, CIN_LENGTH)
  cin: string;

  @IsString()
  @IsNotEmpty()
  job: string;

  @IsEmpty()
  @IsOptional()
  path: string;

  @ValidateNested()
  @Type(() => SkillEntity)
  @IsArray()
  @IsOptional()
  skills: SkillEntity[];
}
