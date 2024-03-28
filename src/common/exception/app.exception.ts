import { HttpStatus } from '@nestjs/common';

import { BaseException, ExceptionDetail } from './base.exception';

export class AppException extends BaseException {
  constructor(
    { message }: ExceptionDetail,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super({ message }, status);
  }

  static notFound(): AppException {
    return new AppException({ message: 'not found' }, HttpStatus.NOT_FOUND);
  }
}
