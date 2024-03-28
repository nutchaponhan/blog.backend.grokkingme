import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { ClsModule } from 'nestjs-cls';

import { AppController } from '@/app.controller';
import { UserModule } from '@/application';
import { AppConfigModule, AppConfigService } from '@/common';
import { PrismaModule, PrismaService } from '@/framework';

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
    UserModule,
  ],
  providers: [AppConfigService],
  controllers: [AppController],
})
export class AppModule {}
