import { forwardRef, Module } from '@nestjs/common';

import { PrismaService } from '@shared/prisma/service/prisma.service';

import { CreateTransactionController } from '@modules/transactions/useCases/create/create-transaction.controller';
import { FindTransactionController } from './useCases/find/find-transaction.controller';
import { ListTransactionsController } from './useCases/list/list-transactions.controller';

import { CreateTransactionUseCase } from '@modules/transactions/useCases/create/create-transaction.use-case';
import { FindTransactionUseCase } from './useCases/find/find-transaction.use-case';
import { ListTransactionsUseCase } from './useCases/list/list-transactions.use-case';

import { TransactionsRepository } from './infra/prisma/repositories/transactions.repository';

import { PayablesModule } from '@modules/payables/payables.module';

@Module({
  imports: [
    forwardRef(() => PayablesModule)
  ],
  controllers: [
    CreateTransactionController,
    FindTransactionController,
    ListTransactionsController
  ],
  providers: [
    PrismaService,
    CreateTransactionUseCase,
    FindTransactionUseCase,
    ListTransactionsUseCase,
    TransactionsRepository
  ],
  exports: [
    FindTransactionUseCase
  ]
})
export class TransactionsModule {};