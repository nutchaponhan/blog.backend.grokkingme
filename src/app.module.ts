import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';

import { AppController } from '@src/app.controller';
import { AppConfigModule, AppConfigService } from '@common/index';
import { PrismaModule, PrismaService } from '@framework/index';

import { ConcertModule, ReservationModule } from '@application/index';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClsModule.forRoot({
      plugins: [
        new ClsPluginTransactional({
          imports: [PrismaModule],
          adapter: new TransactionalAdapterPrisma({
            prismaInjectionToken: PrismaService,
          }),
        }),
      ],
      global: true,
      middleware: { mount: true },
    }),
    AppConfigModule,
    ConcertModule,
    ReservationModule,
  ],
  providers: [AppConfigService],
  controllers: [AppController],
})
export class AppModule {}
