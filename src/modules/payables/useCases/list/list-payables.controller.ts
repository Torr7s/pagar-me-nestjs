import { Request, Response } from 'express';
import {
  Controller,
  Get,
  Param, Res, Req
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

import { ListPayablesUseCase } from '@modules/payables/useCases/list/list-payables.use-case';
import { ListPayablesResponse } from '@modules/payables/domain/swagger/responses/list-payables.response';

import { Payables } from '@prisma/client';

import { ApiTagsAndBearer } from '@shared/utils/decorators/nest.decorators';

import { PayableStatus } from '@types';

@ApiTagsAndBearer('Payables')
@Controller('/api/payables')
export class ListPayablesController {
  constructor(private listPayablesUseCase: ListPayablesUseCase) {};
  
  @ApiParam({
    name: 'status',
    type: 'string',
    description: 'The status to look for in payables',
    enum: PayableStatus
  })
  @ApiOperation({ description: 'List all payables by their status.' })
  @ApiResponse({
    status: 200,
    description: 'Payables successfully found.',
    isArray: true,
    type: ListPayablesResponse
  })
  @ApiResponse({ status: 400, description: 'No payables were found.' })
  @ApiResponse({ status: 404, description: 'Incorrect or misreported availability status.' })
  
  @Get('/:status')
  async handle(
    @Res() response: Response,
    @Req() request: Request,
    @Param('status') status: string,
  ): Promise<Response> {
    const consumerId = request.user as string;
    
    const payables: Payables[] = await this.listPayablesUseCase.perform(consumerId, status);
    
    return response.json(payables);
  }
}