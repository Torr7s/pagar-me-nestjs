import { Request, Response } from 'express';
import {
  Controller,
  Get,
  Req, Res
} from '@nestjs/common';
import {
  ApiParam,
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';

import { ListTransactionsUseCase } from './list-transactions.use-case';

import { Transactions } from '@prisma/client';

import { ApiTagsAndBearer } from '@shared/utils/decorators/nest.decorators';
import { CreateTransactionResponse } from '@modules/transactions/domain/swagger/responses/create-transaction.response';

@ApiTagsAndBearer('Transactions')
@Controller('/api/transactions')
export class ListTransactionsController {
  constructor(private listTransactionsUseCase: ListTransactionsUseCase) {};

  @ApiOperation({ description: 'List all consumer transactions.' })
  @ApiResponse({
    status: 200,
    description: 'Transactions successfully found.',
    isArray: true,
    type: CreateTransactionResponse
  })
  @ApiResponse({ status: 400, description: 'No transactions were found.' })
  
  @Get('/')
  async handle(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<Response> {
    const transactions: Transactions[] = await this.listTransactionsUseCase.perform(request.user as string);
    
    return response.json(transactions);
  }
}