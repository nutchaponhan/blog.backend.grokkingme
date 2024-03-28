import { Expose, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class BookReservationDto {
  @Expose()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  concertId: number;

  @Expose()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  userId: number;
}
