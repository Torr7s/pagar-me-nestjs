import { Injectable } from '@nestjs/common';

import { Consumers } from '@prisma/client';

import { ICreateConsumerRequest } from '@types';
import { IConsumersRepository } from '@modules/consumers/domain/repositories/consumers.interface';

import { PrismaService } from '@shared/prisma/service/prisma.service';

@Injectable()
export class ConsumersRepository implements IConsumersRepository {
  private readonly include = {
    transactions: {
      select: {
        id: true,
        value: true,
        description: true,
        payment_method: true,
        payables: {
          select: {
            id: true,
            status: true,
            fee: true
          }
        }
      }
    }
  }
  
  constructor(private readonly prisma: PrismaService) {};
  
  async create({ name, email, password }: ICreateConsumerRequest): Promise<Consumers> {
    return await this.prisma.consumers.create({
      data: {
        name,
        email,
        password
      }
    });
  }
  
  async findByEmail(email: string): Promise<Consumers> {
    return await this.prisma.consumers.findUnique({
      where: {
        email
      }
    });
  }
  
  async findOne(id: string): Promise<Consumers> {
    return await this.prisma.consumers.findUnique({
      where: {
        id
      },
      include: this.include
    });
  }
  
  async list(): Promise<Consumers[]> {
    return await this.prisma.consumers.findMany();
  }
}