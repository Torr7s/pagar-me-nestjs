import { Request, Response } from 'express';
import {
  Body,
  Controller,
  Post, Req, Res
} from '@nestjs/common';

import { CreateTransactionDto } from '@modules/transactions/domain/dtos/create-transaction.dto';
import { CreateTransactionUseCase } from './create-transaction.use-case';

@Controller('/api/transactions')
export class CreateTransactionController {
  constructor(private createTransactionUseCase: CreateTransactionUseCase) {};
  
  @Post('/')
  async handle(
    @Body() data: CreateTransactionDto,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<Response> {
    data.consumerId = request.user as string;
    
    const [transaction] = await Promise.all([this.createTransactionUseCase.perform(data)]);
    
    return response.json({
      message: 'Transaction successfully processed, check your transactions in /api/transactions.',
      transaction
    });
  }
}