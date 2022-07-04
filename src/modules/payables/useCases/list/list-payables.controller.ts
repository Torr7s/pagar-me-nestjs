import { Response } from 'express';
import {
  Controller,
  Get,
  Param, Res
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

@ApiTagsAndBearer('Payables')
@Controller('/api/payables')
export class ListPayablesController {
  constructor(private listPayablesUseCase: ListPayablesUseCase) {};
  
  @ApiParam({
    name: 'status',
    type: 'string'
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
    @Param('status') status: string,
  ): Promise<Response> {
    const payables: Payables[] = await this.listPayablesUseCase.perform(status);
    
    return response.json(payables);
  }
}