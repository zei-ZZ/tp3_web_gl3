import { CvEntity } from '../../cvs/entities/cv.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skill')
export class SkillEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  desigantion: string;

  @ManyToMany(() => CvEntity, { cascade: ['insert', 'update'] })
  cvs: CvEntity[];
}
