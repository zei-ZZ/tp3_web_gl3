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
import { UserEntity } from '../../auth/entities/user.entity';
import { AddSkillDto } from '../../skills/dto/add-skill.dto';

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

  @IsEmpty()
  @IsOptional()
  user: UserEntity;

  @ValidateNested()
  @Type(() => AddSkillDto)
  @IsArray()
  @IsOptional()
  skills: AddSkillDto[];
}
