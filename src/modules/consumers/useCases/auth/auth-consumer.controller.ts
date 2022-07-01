import { Response } from 'express';
import {
  Body,
  Controller,
  HttpCode, HttpStatus,
  Post, Res
} from '@nestjs/common';

import { AuthConsumerDto } from '@modules/consumers/domain/dtos/auth-consumer.dto';
import { AuthConsumerUseCase } from './auth-consumer.use-case';

import { IsPublic } from '@shared/container/providers/auth/decorators/public-key.decorator';

@Controller()
export class AuthConsumerController {
  constructor(private authConsumerUseCase: AuthConsumerUseCase) {};
  
  @Post('/login')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body() data: AuthConsumerDto,
    @Res() response: Response
  ): Promise<Response> {
    const token: string = await this.authConsumerUseCase.perform(data);

    return response.json({
      message: 'Successfully authenticated.',
      access_token: token
    });
  };
}