import { Injectable } from '@nestjs/common'

import { PayablesHelper } from '@core/helpers/payables/payables.helper';
import { PayablesRepository } from '@modules/payables/infra/prisma/repositories/payables.repository';

import { FindConsumerUseCase } from '@modules/consumers/useCases/find/find-consumer.use-case';
import { FindTransactionUseCase } from '@modules/transactions/useCases/find/find-transaction.use-case';

import { ICreatePayableRequest } from '@types';

@Injectable()
export class CreatePayableUseCase {
  constructor(
    private payablesRepository: PayablesRepository,
    private findConsumerService: FindConsumerUseCase,
    private findTransactionService: FindTransactionUseCase
  ) {};
  
  async perform({ consumerId, transactionId }: ICreatePayableRequest): Promise<ICreatePayableRequest> {
    const [, transaction] = await Promise.all([
      this.findConsumerService.perform(consumerId),
      this.findTransactionService.perform(transactionId)
    ]);
    
    const helper = new PayablesHelper(transaction);
    
    let payableData: ICreatePayableRequest;
    
    if (transaction.payment_method === 'debit_card') {
      payableData = helper.getDebitFee();
      
      await this.payablesRepository.create(payableData);
    } else if (transaction.payment_method === 'credit_card') {
      payableData = helper.getCreditFee();
      
      await this.payablesRepository.create(payableData);
    }
    
    return payableData;
  }
}