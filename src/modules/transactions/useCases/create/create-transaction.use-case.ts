import { Injectable } from '@nestjs/common';
import { Transactions } from '@prisma/client';

import { TransactionsRepository } from '@modules/transactions/infra/prisma/repositories/transactions.repository';

import { ICreatePayableRequest, ICreateTransactionRequest } from '@types';

import { CreatePayableUseCase } from '@modules/payables/useCases/create/create-payable.use-case';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private createPayableUseCase: CreatePayableUseCase
  ) {};
  
  async perform(data: ICreateTransactionRequest): Promise<{ payable: ICreatePayableRequest }> {
    data.card_number = data.card_number.slice(-4);
  
    const transaction: Transactions = await this.transactionsRepository.create(data);
  
    const payable = await this.createPayableUseCase.perform({
      consumerId: transaction.consumerId,
      transactionId: transaction.id
    });
  
    return {
      ...transaction,
      payable
    };
  }
}