import { Action } from '@prisma/client';

import { UserEntity } from './user.entity';
import { ConcertEntity } from './concert.entity';

export class ReservationAuditEntity {
  id: number;
  user: UserEntity;
  userId: number;
  concert: ConcertEntity;
  concertId: number;
  action: Action;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  fullname?: string;
  concertName?: string;
}
