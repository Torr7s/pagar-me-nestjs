import { Response } from 'express';
import {
  Controller,
  Get,
  Param, Res
} from '@nestjs/common';
import {
  ApiParam,
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';

import { CreateTransactionResponse } from '@modules/transactions/domain/swagger/responses/create-transaction.response';

import { FindTransactionUseCase } from './find-transaction.use-case';

import { Transactions } from '@prisma/client';

import { ApiTagsAndBearer } from '@shared/utils/decorators/nest.decorators';

@ApiTagsAndBearer('Transactions')
@Controller('/api/transactions')
export class FindTransactionController {
  constructor(private findTransactionUseCase: FindTransactionUseCase) {};
  
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  @ApiOperation({ description: 'Find a transaction by its id.' })
  @ApiResponse({ status: 200, description: 'Transaction successfully found.', type: CreateTransactionResponse })
  @ApiResponse({ status: 400, description: 'No transaction was found.' })
  
  @Get('/:id')
  async handle(
    @Param('id') id: string,
    @Res() response: Response
  ): Promise<Response> {
    const transaction: Transactions = await this.findTransactionUseCase.perform(id);
    
    return response.json(transaction);
  }
}