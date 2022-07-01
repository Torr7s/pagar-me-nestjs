import { Injectable } from '@nestjs/common';
import { Transactions } from '@prisma/client';

import { TransactionsRepository } from '@modules/transactions/infra/prisma/repositories/transactions.repository';
import { FindTransactionUseCase } from '@modules/transactions/useCases/find/find-transaction.use-case';

import { IUpdateTransactionRequest } from '@types';

@Injectable()
export class UpdateTransactionUseCase {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private findTransactionUseCase: FindTransactionUseCase
  ) {};
  
  async perform(id: string, data: IUpdateTransactionRequest): Promise<Transactions> {
    await this.findTransactionUseCase.perform(id);
    
    return await this.transactionsRepository.update(id, data);
  }
}