import { Response } from 'express';
import {
  Controller,
  Get,
  Param, Res
} from '@nestjs/common';

import { ListPayablesUseCase } from '@modules/payables/useCases/list/list-payables.use-case';
import { Payables } from '@prisma/client';

@Controller('/api/payables')
export class ListPayablesController {
  constructor(private listPayablesUseCase: ListPayablesUseCase) {};
  
  @Get('/:status')
  async handle(
    @Res() response: Response,
    @Param('status') status: string,
  ): Promise<Response> {
    const payables: Payables[] = await this.listPayablesUseCase.perform(status);
    
    return response.json(payables);
  }
}