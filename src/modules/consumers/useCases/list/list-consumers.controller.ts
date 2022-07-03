import { Request, Response } from 'express';
import { 
  Controller, 
  Get, 
  Req, Res
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { CreateConsumerResponse } from '@modules/consumers/domain/swagger/responses/create-consumer.response';

import { ListConsumersUseCase } from './list-consumers.use-case';

import { Consumers } from '@prisma/client';

import { ApiTagsAndBearer } from '@shared/utils/decorators/nest.decorators';

@ApiTagsAndBearer('Consumers')
@Controller('/api/consumers')
export class ListConsumersController {
  constructor(private listConsumersUseCase: ListConsumersUseCase) {};
  
  @ApiOperation({ description: 'List all registered consumers. '})
  @ApiResponse({
    status: 200,
    description: 'At least one consumer profile was found.',
    isArray: true,
    type: CreateConsumerResponse
  })
  @ApiResponse({ status: 400, description: 'No consumer profiles found.' })
  
  @Get('/')
    async handle(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<Response> {
    const consumers: Consumers[] = await this.listConsumersUseCase.perform();

    return response.json(consumers);
  }
}