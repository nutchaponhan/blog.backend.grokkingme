import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AppConfigService } from '@/common';

@Injectable()
export class AuthService {
  private accessSecret;
  private refreshSecret;

  constructor(
    private jwtService: JwtService,
    private appService: AppConfigService,
  ) {
    const { accessSecret, refreshSecret } = this.appService.getJwtSecrets();

    this.accessSecret = accessSecret;
    this.refreshSecret = refreshSecret;
  }

  async createTokens(payload: { sub: number; email: string }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.accessSecret,
        expiresIn: '15m',
      }),

      this.jwtService.signAsync(payload, {
        secret: this.refreshSecret,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
