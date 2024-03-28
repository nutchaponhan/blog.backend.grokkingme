import { UserEntity } from './user.entity';
import { ConcertEntity } from './concert.entity';

export class ReservationEntity {
  id: number;
  user: UserEntity;
  userId: number;
  concert: ConcertEntity;
  concertId: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
