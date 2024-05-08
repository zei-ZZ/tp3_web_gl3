import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../auth/entities/user.entity';
import { CvEntity } from '../../cvs/entities/cv.entity';

export const CV = 'cv';

export enum EventType {
  ADD = `${CV}.add`,
  DELETE = `${CV}.delete`,
  UPDATE = `${CV}.update`,
}

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: EventType })
  type: EventType;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column(() => CvEntity)
  cv: CvEntity;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
