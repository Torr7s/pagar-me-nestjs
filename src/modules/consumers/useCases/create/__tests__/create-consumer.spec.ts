import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { CreateConsumerUseCase } from '@modules/consumers/useCases/create/create-consumer.use-case';

import { ConsumersRepository } from '@modules/consumers/infra/prisma/repositories/consumers.repository';
import { ConsumersInMemoryRepository } from '@modules/consumers/infra/prisma/repositories/inMemory/consumers-in-memory.repository';

import { AuthProviderModule } from '@shared/container/providers/auth/auth.module';
import { AuthProviderService } from '@shared/container/providers/auth/services/auth.service';

const password: string = 'youshallnotpass';

describe('ConsumersModule', (): void => {
  let createConsumerUseCase: CreateConsumerUseCase;
  
  beforeEach(async(): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthProviderModule],
      providers: [
        AuthProviderService,
        CreateConsumerUseCase,
        {
          provide: ConsumersRepository,
          useClass: ConsumersInMemoryRepository
        }
      ]
    }).compile();
    
    createConsumerUseCase = module.get<CreateConsumerUseCase>(CreateConsumerUseCase);
  });
  
  it('should be defined', (): void => {
    expect(createConsumerUseCase).toBeDefined();
  });
  
  describe('CreateConsumerUseCase', (): void => {
    it('should be able to create a new consumer', async (): Promise<void> => {
      await expect(
        createConsumerUseCase.perform({
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          password
        })
      ).toBeDefined();
    });
    
    it('should not be able to create a consumer with an email already registered', async (): Promise<void> => {
      await createConsumerUseCase.perform({
        name: 'John Doe',
        email: 'johndoetest@gmail.com',
        password
      });
      
      await expect(
        createConsumerUseCase.perform({
          name: 'John Doe',
          email: 'johndoetest@gmail.com',
          password
        })
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });
});