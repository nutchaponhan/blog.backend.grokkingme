import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  getPort(): number {
    return this.configService.get<number>('app.port') || 3000;
  }

  getNodeEnv(): string {
    return this.configService.get<string>('app.nodeEnv') || 'development';
  }

  getDatabaseUrl(): string {
    return this.configService.get<string>('database.url') || '';
  }
}
