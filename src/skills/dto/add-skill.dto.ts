import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddSkillDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
