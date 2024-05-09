import { UserEntity } from 'src/auth/entities/user.entity';
import { CvEntity } from 'src/cvs/entities/cv.entity';

export interface eventData {
  user: UserEntity;
  cv: CvEntity;
  operation: string;
}
