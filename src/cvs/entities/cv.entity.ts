import { SkillEntity } from '../../skills/entities/skill.entity';
import { UserEntity } from '../../auth/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cv')
export class CvEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column()
  age: number;

  @Column()
  cin: string;

  @Column()
  job: string;

  @Column({
    nullable: true,
  })
  path?: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.cvs, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinColumn()
  user: UserEntity;

  @ManyToMany(() => SkillEntity, { cascade: ['insert', 'update'] })
  @JoinTable()
  skills: SkillEntity[];
}
