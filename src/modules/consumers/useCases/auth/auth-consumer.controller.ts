import { Response } from 'express';
import {
  Body,
  Controller,
  HttpCode, HttpStatus,
  Post, Res
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

import { AuthConsumerDto } from '@modules/consumers/domain/dtos/auth-consumer.dto';
import { AuthConsumerResponse } from '@modules/consumers/domain/swagger/responses/auth-consumer.response';

import { AuthConsumerUseCase } from './auth-consumer.use-case';

import { IsPublic } from '@shared/container/providers/auth/decorators/public-key.decorator';

@ApiTags('Consumers')
@Controller()
export class AuthConsumerController {
  constructor(private authConsumerUseCase: AuthConsumerUseCase) {};
  
  @ApiBody({ type: AuthConsumerDto })
  @ApiOperation({ description: 'Consumer authentication by their email and password.' })
  @ApiResponse({ status: 200, description: 'Consumer successfully authenticated.', type: AuthConsumerResponse })
  @ApiResponse({ status: 401, description: 'Invalid credentials provided.' })
  
  @Post('/login')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body() data: AuthConsumerDto,
    @Res() response: Response
  ): Promise<Response> {
    const { token } = await this.authConsumerUseCase.perform(data);

    return response.json({
      message: 'Successfully authenticated.',
      token
    });
  };
}