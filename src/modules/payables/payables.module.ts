import { Module } from '@nestjs/common';

import { PrismaService } from '@shared/prisma/service/prisma.service';

import { ListPayablesController } from '@modules/payables/useCases/list/list-payables.controller';

import { CreatePayableUseCase } from './useCases/create/create-payable.use-case';
import { ListPayablesUseCase } from '@modules/payables/useCases/list/list-payables.use-case';

import { PayablesRepository } from './infra/prisma/repositories/payables.repository';

/* External Modules */
import { ConsumersModule } from '@modules/consumers/consumers.module';
import { TransactionsModule } from '@modules/transactions/transactions.module';

@Module({
  imports: [
    ConsumersModule,
    TransactionsModule
  ],
  controllers: [
    ListPayablesController
  ],
  providers: [
    PrismaService,
    CreatePayableUseCase,
    ListPayablesUseCase,
    PayablesRepository
  ],
  exports: [
    CreatePayableUseCase
  ]
})
export class PayablesModule {};