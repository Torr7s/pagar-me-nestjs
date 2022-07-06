import { Module } from '@nestjs/common';

import { PrismaService } from '@shared/prisma/service/prisma.service';

import { AuthConsumerController } from './useCases/auth/auth-consumer.controller';
import { CreateConsumerController } from './useCases/create/create-consumer.controller';

import { AuthConsumerUseCase } from './useCases/auth/auth-consumer.use-case';
import { CreateConsumerUseCase } from './useCases/create/create-consumer.use-case';
import { FindConsumerUseCase } from './useCases/find/find-consumer.use-case';

import { ConsumersRepository } from './infra/prisma/repositories/consumers.repository';

import { AuthProviderModule } from '@shared/container/providers/auth/auth.module';
import { AuthProviderService } from '@shared/container/providers/auth/services/auth.service';

@Module({
  imports: [AuthProviderModule],
  controllers: [
    AuthConsumerController,
    CreateConsumerController,
  ],
  providers: [
    PrismaService,

    AuthProviderService,

    AuthConsumerUseCase,
    CreateConsumerUseCase,
    FindConsumerUseCase,
    
    ConsumersRepository
  ],
  exports: [
    FindConsumerUseCase,
    ConsumersRepository
  ]
})
export class ConsumersModule {};