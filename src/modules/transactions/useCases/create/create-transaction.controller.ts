import { Response } from 'express';
import {
  Body,
  Controller,
  Post, Res
} from '@nestjs/common';

import { CreateTransactionDto } from '@modules/transactions/domain/dtos/create-transaction.dto';
import { CreateTransactionUseCase } from './create-transaction.use-case';

import { Transactions } from '@prisma/client';

@Controller('/api/transactions')
export class CreateTransactionController {
  constructor(private createTransactionUseCase: CreateTransactionUseCase) {};
  
  @Post('/')
  async handle(
    @Body() data: CreateTransactionDto,
    @Res() response: Response
  ): Promise<Response> {
    const transaction: Transactions = await this.createTransactionUseCase.perform(data);
    
    return response.json({
      message: 'Transaction successfully processed, check your transactions in /api/transactions.',
      transaction
    });
  }
}