import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AccessTokenStrategy, RefreshTokenStrategy } from '@/framework/jwt';

import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
