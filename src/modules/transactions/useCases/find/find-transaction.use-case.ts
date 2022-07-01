import { BadRequestException, Injectable } from '@nestjs/common';
import { Transactions } from '@prisma/client';

import { TransactionsRepository } from '@modules/transactions/infra/prisma/repositories/transactions.repository';

@Injectable()
export class FindTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {};

  async perform(id: string): Promise<Transactions> {
    const transaction: Transactions = await this.transactionsRepository.findOne(id);

    if (!transaction) {
      throw new BadRequestException(
        'No transaction was found with this id.',
        'There is no transaction record with this id in the system.'
      );
    }

    return transaction;
  }
}