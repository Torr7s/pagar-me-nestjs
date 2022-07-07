import { Consumers } from '@prisma/client';

import { IConsumersRepository } from '@modules/consumers/domain/repositories/consumers.interface';
import { ICreateConsumerRequest } from '@types';

export class ConsumersInMemoryRepository implements IConsumersRepository {
  private consumers: Consumers[] = [];
  
  async create(data: ICreateConsumerRequest): Promise<Consumers> {
    const consumer: Consumers = Object.assign({}, data as Consumers);

    this.consumers.push(consumer);

    return consumer;
  }
  
  async findByEmail(email: string): Promise<Consumers> {
    return this.consumers.find((consumer) => consumer.email === email);
  }
  
  async findOne(id: string): Promise<Consumers> {
    return this.consumers.find((consumer) => consumer.id === id);
  }
  
  async list(): Promise<Consumers[]> {
    return this.consumers;
  }
}