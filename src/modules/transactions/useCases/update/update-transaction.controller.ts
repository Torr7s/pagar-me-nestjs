import { Response } from 'express';
import {
  Body,
  Controller,
  Patch,
  Param, Res
} from '@nestjs/common';

import { UpdateTransactionDto } from '@modules/transactions/domain/dtos/update-transaction.dto';
import { UpdateTransactionUseCase } from './update-transaction.use-case';

import { Transactions } from '@prisma/client';

@Controller('/api/transactions')
export class UpdateTransactionController {
  constructor(private updateTransactionUseCase: UpdateTransactionUseCase) {};
  
  @Patch('/:id')
  async handle(
    @Param('id') id: string,
    @Body() data: UpdateTransactionDto,
    @Res() response: Response
  ): Promise<Response> {
    const transaction: Transactions = await this.updateTransactionUseCase.perform(id, data);
    
    return response.json(transaction);
  }
}