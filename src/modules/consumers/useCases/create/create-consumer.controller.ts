import { Response } from 'express';
import { 
  Body, 
  Controller, 
  Post, Res 
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

import { CreateConsumerDto } from '@modules/consumers/domain/dtos/create-consumer.dto';
import { CreateConsumerResponse } from '@modules/consumers/domain/swagger/responses/create-consumer.response';
import { CreateConsumerUseCase } from './create-consumer.use-case';

import { Consumers } from '@prisma/client';

import { IsPublic } from '@shared/container/providers/auth/decorators/public-key.decorator';

@ApiTags('Consumers')
@Controller('/api/consumers')
export class CreateConsumerController {
  constructor(private createConsumerUseCase: CreateConsumerUseCase) {};

  @ApiBody({ type: CreateConsumerDto })
  @ApiOperation({ description: 'Create a consumer profile.' })
  @ApiResponse({ status: 200, description: 'Consumer successfully created.', type: CreateConsumerResponse })
  @ApiResponse({ status: 400, description: 'Consumer already exists.' })
  
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