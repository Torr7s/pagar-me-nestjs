import { Response } from 'express';
import {
  Body,
  Controller,
  Post, Res
} from '@nestjs/common';

import { CreatePayableDto } from '@modules/payables/domain/dtos/create-payable.dto';
import { CreatePayableUseCase } from '@modules/payables/useCases/create/create-payable.use-case';

@Controller('/api/transactions')
export class CreatePayableController {
  constructor(private createPayableUseCase: CreatePayableUseCase) {};

  @Post('/')
  async handle(
    @Body() data: CreatePayableDto,
    @Res() response: Response
  ): Promise<Response> {
    const payable = await this.createPayableUseCase.perform(data);
    
    return response.json(payable)
  }
}