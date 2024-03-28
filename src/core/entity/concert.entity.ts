import { UserEntity } from './user.entity';

export class ConcertEntity {
  id: number;
  name: string;
  description: string;
  seat: number;
  createdBy: UserEntity;
  createdById: number;

  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
