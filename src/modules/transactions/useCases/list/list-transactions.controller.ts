import { Request, Response } from 'express';
import {
  Controller,
  Get,
  Req, Res
} from '@nestjs/common';

import { ListTransactionsUseCase } from './list-transactions.use-case';

import { Transactions } from '@prisma/client';

@Controller('/api/transactions')
export class ListTransactionsController {
  constructor(private listTransactionsUseCase: ListTransactionsUseCase) {};
  
  @Get('/')
  async handle(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<Response> {
    const transactions: Transactions[] = await this.listTransactionsUseCase.perform(request.user as string);
    
    return response.json(transactions);
  }
}