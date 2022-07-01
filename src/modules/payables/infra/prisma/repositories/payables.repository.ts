import { Injectable } from '@nestjs/common';

import { Payables } from '@prisma/client';

import { ICreatePayableRequest } from '@types';
import { IPayablesRepository } from '@modules/payables/domain/repositories/payables.interface';

import { PrismaService } from '@shared/prisma/service/prisma.service';

@Injectable()
export class PayablesRepository implements IPayablesRepository {
  constructor(private prisma: PrismaService) {};
  
  async create(data: ICreatePayableRequest): Promise<Payables> {
    return await this.prisma.payables.create({
      data
    });
  }
  
  async findOne(transactionId: string): Promise<Payables> {
    return await this.prisma.payables.findUnique({
      where: {
        transactionId
      }
    });
  }
  
  async list(status?: string): Promise<Payables[]> {
    return await this.prisma.payables.findMany({
      where: {
        status
      }
    });
  }
}