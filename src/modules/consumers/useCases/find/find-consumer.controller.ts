import { Response } from 'express';
import {
  Controller,
  Get,
  Param, Res
} from '@nestjs/common';

import { FindConsumerUseCase } from './find-consumer.use-case';

import { Consumers } from '@prisma/client';

@Controller('/api/consumers')
export class FindConsumerController {
  constructor(private findConsumerUseCase: FindConsumerUseCase) {};
  
  @Get('/:id')
  async handle(
    @Param('id') id: string,
    @Res() response: Response
  ): Promise<Response> {
    const consumer: Consumers = await this.findConsumerUseCase.perform(id);
    
    return response.json(consumer);
  }
}