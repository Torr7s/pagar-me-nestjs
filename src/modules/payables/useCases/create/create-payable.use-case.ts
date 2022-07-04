import { Injectable } from '@nestjs/common'

import { PayablesHelper } from '@core/helpers/payables/payables.helper';
import { PayablesRepository } from '@modules/payables/infra/prisma/repositories/payables.repository';

import { FindConsumerUseCase } from '@modules/consumers/useCases/find/find-consumer.use-case';
import { FindTransactionUseCase } from '@modules/transactions/useCases/find/find-transaction.use-case';

import { ICreatePayableRequest } from '@types';

import { Payables } from '@prisma/client';

@Injectable()
export class CreatePayableUseCase {
  constructor(
    private payablesRepository: PayablesRepository,
    private findConsumerService: FindConsumerUseCase,
    private findTransactionService: FindTransactionUseCase
  ) {};
  
  async perform({ consumerId, transactionId }: ICreatePayableRequest): Promise<Payables> {
    const [, transaction] = await Promise.all([
      this.findConsumerService.perform(consumerId),
      this.findTransactionService.perform(transactionId)
    ]);
    
    const payableHelper = new PayablesHelper(transaction);
    const payableFee: ICreatePayableRequest = payableHelper.getFee();
    
    const payable: Payables = await this.payablesRepository.create(payableFee)
    
    return payable;
  }
}