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

import { CreateConsumerResponse } from '@modules/consumers/domain/swagger/responses/create-consumer.response';

import { FindConsumerUseCase } from './find-consumer.use-case';

import { Consumers } from '@prisma/client';

import { ApiTagsAndBearer } from '@shared/utils/decorators/nest.decorators';

@ApiTagsAndBearer('Consumers')
@Controller('/api/consumers')
export class FindConsumerController {
  constructor(private findConsumerUseCase: FindConsumerUseCase) {};
  
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  @ApiOperation({ description: 'Find a consumer profile.' })
  @ApiResponse({ status: 200, description: 'A consumer profile was found.', type: CreateConsumerResponse })
  @ApiResponse({ status: 400, description: 'Consumer does not exists.' })
  
  @Get('/:id')
  async handle(
    @Param('id') id: string,
    @Res() response: Response
  ): Promise<Response> {
    const consumer: Consumers = await this.findConsumerUseCase.perform(id);
    
    return response.json(consumer);
  }
}