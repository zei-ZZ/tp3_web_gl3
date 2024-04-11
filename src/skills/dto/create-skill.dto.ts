import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CvEntity } from '../../cvs/entities/cv.entity';

export class CreateSkillDto {
  @IsString()
  @IsNotEmpty()
  desigantion: string;
}
