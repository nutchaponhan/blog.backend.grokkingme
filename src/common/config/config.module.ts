import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigService } from './config.service';
import { appConfig, dbConfig, jwtSecretConfig } from './configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, dbConfig, jwtSecretConfig],
      envFilePath: ['.env'],
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
