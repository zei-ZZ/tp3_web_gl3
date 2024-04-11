import { CvEntity } from '../../cvs/entities/cv.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  Admin = 'admin',
  Client = 'client',
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Client,
  })
  role: Role;

  @OneToMany(() => CvEntity, (cv: CvEntity) => cv.user, { cascade: ['insert', 'update'] })
  cvs: CvEntity[];
}
