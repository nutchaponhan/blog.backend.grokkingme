import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigService } from './config.service';
import { appConfig, dbConfig } from './configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, dbConfig],
      envFilePath: ['.env'],
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
