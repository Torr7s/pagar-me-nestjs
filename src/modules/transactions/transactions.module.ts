import { forwardRef, Module } from '@nestjs/common';

import { PrismaService } from '@shared/prisma/service/prisma.service';

import { FindTransactionController } from './useCases/find/find-transaction.controller';
import { ListTransactionsController } from './useCases/list/list-transactions.controller';
import { UpdateTransactionController } from '@modules/transactions/useCases/update/update-transaction.controller';

import { FindTransactionUseCase } from './useCases/find/find-transaction.use-case';
import { ListTransactionsUseCase } from './useCases/list/list-transactions.use-case';
import { UpdateTransactionUseCase } from '@modules/transactions/useCases/update/update-transaction.use-case';

import { TransactionsRepository } from './infra/prisma/repositories/transactions.repository';

import { PayablesModule } from '@modules/payables/payables.module';

@Module({
  imports: [
    forwardRef(() => PayablesModule)
  ],
  controllers: [
    FindTransactionController,
    ListTransactionsController,
    UpdateTransactionController,
  ],
  providers: [
    PrismaService,
    FindTransactionUseCase,
    ListTransactionsUseCase,
    UpdateTransactionUseCase,
    TransactionsRepository
  ],
  exports: [
    FindTransactionUseCase
  ]
})
export class TransactionsModule {};