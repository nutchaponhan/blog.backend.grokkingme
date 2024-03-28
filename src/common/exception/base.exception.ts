import { HttpException } from '@nestjs/common';

export type ExceptionDetail = {
  message?: string;
};

export class BaseException extends HttpException {
  constructor({ message }: ExceptionDetail, status: number) {
    super({ message }, status);
  }
}
