import { Expose, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CancelReservationDto {
  @Expose()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  reservationId: number;
}
