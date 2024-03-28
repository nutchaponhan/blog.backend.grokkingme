import { Expose, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UserReservationDto {
  @Expose()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  userId: number;
}
