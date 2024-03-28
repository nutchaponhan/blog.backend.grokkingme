import { HttpException } from '@nestjs/common';

export type ExceptionDetail = {
  error?: any;
  message?: any;
};

export class BaseException extends HttpException {
  constructor({ error, message }: ExceptionDetail, status) {
    super({ message, error }, status);
  }
}
