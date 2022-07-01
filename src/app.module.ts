import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@shared/prisma/prisma.module';

import { ConsumersModule } from '@modules/consumers/consumers.module';
import { PayablesModule } from '@modules/payables/payables.module';
import { TransactionsModule } from '@modules/transactions/transactions.module';

import { AuthProviderModule } from '@shared/container/providers/auth/auth.module';
import { JwtAuthGuard } from '@shared/container/providers/auth/guards/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthProviderModule,
    ConsumersModule,
    PayablesModule,
    TransactionsModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {};
