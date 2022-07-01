import { BadRequestException, Injectable } from '@nestjs/common';
import { Transactions } from '@prisma/client';

import { TransactionsRepository } from '@modules/transactions/infra/prisma/repositories/transactions.repository';

@Injectable()
export class ListTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {};
  
  async perform(): Promise<Transactions[]> {
    const transactions: Transactions[] = await this.transactionsRepository.list();
    
    if (!transactions.length) {
      throw new BadRequestException(
        'No transactions were found.',
        'There is no transaction registration in the system.'
      );
    }
    
    return transactions;
  }
}