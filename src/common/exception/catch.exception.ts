import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseException } from './base.exception';

@Catch()
export class CatchExceptions implements ExceptionFilter {
  constructor() {}

  async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
    const response = host.switchToHttp().getResponse();

    let result = {
      error: undefined,
      message: exception?.message,
    };

    if (exception instanceof HttpException) {
      const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
      const exceptionResponse = exception.getResponse() as any;

      if (exceptionResponse) {
        result = {
          ...result,
          ...exceptionResponse,
        };
      }

      if (exception instanceof BaseException) {
        result.error = exceptionResponse?.error;
      }

      return response.status(status).json(result);
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(result);
  }
}
