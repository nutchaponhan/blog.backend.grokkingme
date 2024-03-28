import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  getPort(): number {
    return this.configService.get<number>('app.port') || 3100;
  }

  getNodeEnv(): string {
    return this.configService.get<string>('app.nodeEnv') || 'development';
  }

  getDatabaseUrl(): string {
    return this.configService.get<string>('database.url') || '';
  }

  getJwtSecrets(): { accessSecret: string; refreshSecret: string } {
    return {
      accessSecret:
        this.configService.get<string>('jwtSecret.accessSecret') || '',
      refreshSecret:
        this.configService.get<string>('jwtSecret.refreshSecret') || '',
    };
  }
}
