import { Response } from 'express';
import { 
  Body, 
  Controller, 
  Post, Res 
} from '@nestjs/common';

import { CreateConsumerDto } from '@modules/consumers/domain/dtos/create-consumer.dto';
import { CreateConsumerUseCase } from './create-consumer.use-case';

import { Consumers } from '@prisma/client';

import { IsPublic } from '@shared/container/providers/auth/decorators/public-key.decorator';

@Controller('/api/consumers')
export class CreateConsumerController {
  constructor(private createConsumerUseCase: CreateConsumerUseCase) {};

  @Post('/')
  @IsPublic()
  async handle(
    @Body() data: CreateConsumerDto,
    @Res() response: Response
  ): Promise<Response> {
    const consumer: Consumers = await this.createConsumerUseCase.perform(data);

    return response.json({
      message: 'Profile successfully created.',
      consumer
    });
  }
}