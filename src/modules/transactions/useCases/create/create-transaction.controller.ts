import { Request, Response } from 'express';
import {
  Body,
  Controller,
  Post, Req, Res
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';

import { CreateTransactionDto } from '@modules/transactions/domain/dtos/create-transaction.dto';
import { CreateTransactionResponse } from '@modules/transactions/domain/swagger/responses/create-transaction.response';
import { CreateTransactionUseCase } from './create-transaction.use-case';

import { ApiTagsAndBearer } from '@shared/utils/decorators/nest.decorators';

@ApiTagsAndBearer('Transactions')
@Controller('/api/transactions')
export class CreateTransactionController {
  constructor(private createTransactionUseCase: CreateTransactionUseCase) {};
  
  @ApiBody({ type: CreateTransactionDto })
  @ApiOperation({ description: 'Create a transaction.' })
  @ApiResponse({ status: 200, description: 'Transaction successfully created.', type: CreateTransactionResponse })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  
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