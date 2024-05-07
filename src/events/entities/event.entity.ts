import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../auth/entities/user.entity';
import { CvEntity } from '../../cvs/entities/cv.entity';

export enum EventType {
  ADD = 'cv.add',
  DELETE = 'cv.delete',
  UPDATE = 'cv.update',
}
export const CV = 'cv';
@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'enum', enum: EventType })
  type: EventType;
  @ManyToOne(() => UserEntity)
  user: UserEntity;
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @Column(() => CvEntity)
  cv: CvEntity;
}
