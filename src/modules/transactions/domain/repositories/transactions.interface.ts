import { Transactions } from '@prisma/client';

import { ICreateTransactionRequest, IUpdateTransactionRequest } from '@types';

export interface ITransactionsRepository {
  create(data: ICreateTransactionRequest): Promise<Transactions>;
  list(consumerId: string): Promise<Transactions[]>;
  findOne(id: string): Promise<Transactions>;
  update(id: string, data: IUpdateTransactionRequest): Promise<Transactions>;
}