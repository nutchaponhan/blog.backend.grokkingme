export class UserEntity {
  id!: number;
  email!: string;
  firstname!: string;
  lastname!: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
