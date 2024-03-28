import { HttpException } from '@nestjs/common';

type Detail = string | string[];
export type ExceptionDetail = Record<string, Detail>;

export class BaseException extends HttpException {
  constructor(exception: ExceptionDetail, status: number) {
    super(exception, status);
  }
}
