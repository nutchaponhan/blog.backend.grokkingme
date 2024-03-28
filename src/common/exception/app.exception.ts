import { HttpStatus } from '@nestjs/common';

import { BaseException, ExceptionDetail } from './base.exception';

export class AppException extends BaseException {
  constructor(
    { error, message }: ExceptionDetail,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super({ error, message }, status);
  }

  static userNotFound(): AppException {
    return new AppException({ error: 'user not found' }, HttpStatus.NOT_FOUND);
  }

  static concertNotFound(): AppException {
    return new AppException(
      { error: 'concert not found' },
      HttpStatus.NOT_FOUND,
    );
  }

  static concertFull(): AppException {
    return new AppException(
      { error: 'concert seat is not available' },
      HttpStatus.BAD_REQUEST,
    );
  }

  static concertWasReserve(): AppException {
    return new AppException(
      { error: 'you already reserve this concert' },
      HttpStatus.BAD_REQUEST,
    );
  }

  static cannotDeleteConcert(): AppException {
    return new AppException(
      {
        error:
          'concert have been reserved can not delete now, please remove all reservation to be able delete',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  static reservationNotFound(): AppException {
    return new AppException(
      { error: 'reservation not found' },
      HttpStatus.NOT_FOUND,
    );
  }
}
