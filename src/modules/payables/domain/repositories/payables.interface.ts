import { Payables } from '@prisma/client';

import { ICreatePayableRequest } from '@types';

export interface IPayablesRepository {
  create(data: ICreatePayableRequest): Promise<Payables>;
  findOne(transactionId: string): Promise<Payables>;
  list(consumerId: string, status: string): Promise<Payables[]>;
}