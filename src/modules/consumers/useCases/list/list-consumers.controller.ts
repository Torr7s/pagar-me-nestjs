import { Request, Response } from 'express';
import { 
  Controller, 
  Get, 
  Req, Res
} from '@nestjs/common';

import { ListConsumersUseCase } from './list-consumers.use-case';

import { Consumers } from '@prisma/client';

@Controller('/api/consumers')
export class ListConsumersController {
  constructor(private listConsumersUseCase: ListConsumersUseCase) {};

  @Get('/')
  async handle(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<Response> {
    const consumers: Consumers[] = await this.listConsumersUseCase.perform();

    return response.json(consumers);
  }
}