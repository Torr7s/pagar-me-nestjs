import { Injectable } from '@nestjs/common';

import { Transactions } from '@prisma/client';

import { ICreateTransactionRequest, IUpdateTransactionRequest } from '@types';

import { ITransactionsRepository } from '@modules/transactions/domain/repositories/transactions.interface';

import { PrismaService } from '@shared/prisma/service/prisma.service';

@Injectable()
export class TransactionsRepository implements ITransactionsRepository {
  private include = {
    payables: {
      select: {
        id: true,
        status: true,
        payment_date: true,
        fee: true
      }
    }
  }
  
  constructor(private prisma: PrismaService) {};
  
  async create(data: ICreateTransactionRequest): Promise<Transactions> {
    return await this.prisma.transactions.create({
      data
    });
  }
  
  async list(consumerId: string): Promise<Transactions[]> {
    return await this.prisma.transactions.findMany({
      where: {
        consumerId
      },
      include: this.include
    });
  }
  
  async findOne(id: string): Promise<Transactions> {
    return await this.prisma.transactions.findUnique({
      where: {
        id
      },
      include: this.include
    });
  }
  
  async update(id: string, data: IUpdateTransactionRequest): Promise<Transactions> {
    return await this.prisma.transactions.update({
      where: {
        id
      },
      data
    });
  }
}