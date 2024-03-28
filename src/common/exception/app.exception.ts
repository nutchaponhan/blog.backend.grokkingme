import { HttpStatus } from '@nestjs/common';

import { BaseException, ExceptionDetail } from './base.exception';

export class AppException extends BaseException {
  constructor(
    exception: ExceptionDetail,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(exception, status);
  }

  static cannotCreateUser(message): AppException {
    return new AppException({ message }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
