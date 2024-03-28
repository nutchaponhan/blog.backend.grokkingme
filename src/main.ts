import { NestFactory } from '@nestjs/core';
import { ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { CatchExceptions, AppConfigService } from '@common/index';

import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const configService = app.get(AppConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      transform: true,
      exceptionFactory: (validationErrors) => {
        function flattenConstraints(prop, constraints: Record<string, string>) {
          const flattern = [];

          for (const message in constraints) {
            flattern.push({
              property: prop,
              message: message,
            });
          }

          return flattern;
        }

        const errors = validationErrors.reduce((result, error) => {
          if (error.constraints)
            return [
              ...result,
              ...flattenConstraints(error.property, error.constraints),
            ];
        }, []);

        const response = {
          error: 'Bad request',
          status: HttpStatus.BAD_REQUEST,
          message: errors,
        };

        return new HttpException(response, HttpStatus.BAD_REQUEST);
      },
    }),
  );

  app.useGlobalFilters(new CatchExceptions());

  await app.listen(configService.getPort());
}
bootstrap();
