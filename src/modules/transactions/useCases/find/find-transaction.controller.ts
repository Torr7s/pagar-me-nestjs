import { Response } from 'express';
import {
  Controller,
  Get,
  Param, Res
} from '@nestjs/common';

import { FindTransactionUseCase } from './find-transaction.use-case';

import { Transactions } from '@prisma/client';

@Controller('/api/transactions')
export class FindTransactionController {
  constructor(private findTransactionUseCase: FindTransactionUseCase) {};
  
  @Get('/:id')
  async handle(
    @Param('id') id: string,
    @Res() response: Response
  ): Promise<Response> {
    const transaction: Transactions = await this.findTransactionUseCase.perform(id);
    
    return response.json(transaction);
  }
}