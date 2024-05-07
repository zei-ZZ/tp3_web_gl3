import { UserEntity } from '../../auth/entities/user.entity';
import { CvEntity } from '../../cvs/entities/cv.entity';
import { EventType } from '../entities/event.entity';

export class CreateEventDto {
  user: UserEntity;
  cv: CvEntity;
  type: EventType;
}
