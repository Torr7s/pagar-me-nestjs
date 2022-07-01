import { Consumers } from '@prisma/client';

import { ICreateConsumerRequest } from '@types';

export interface IConsumersRepository {
  create(data: ICreateConsumerRequest): Promise<Consumers>;
  findByEmail(email: string): Promise<Consumers>;
  findOne(id: string): Promise<Consumers>;
  list(): Promise<Consumers[]>;
}