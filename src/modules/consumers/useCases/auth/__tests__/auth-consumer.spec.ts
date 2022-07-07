import { Test, TestingModule } from '@nestjs/testing';

import { AuthConsumerUseCase } from '../auth-consumer.use-case';
import { CreateConsumerUseCase } from '@modules/consumers/useCases/create/create-consumer.use-case';

import { ConsumersRepository } from '@modules/consumers/infra/prisma/repositories/consumers.repository';
import { ConsumersInMemoryRepository } from '@modules/consumers/infra/prisma/repositories/inMemory/consumers-in-memory.repository';

import { AuthProviderModule } from '@shared/container/providers/auth/auth.module';
import { AuthProviderService } from '@shared/container/providers/auth/services/auth.service';

import { ICreateConsumerRequest } from '@types';

const password: string = 'youshallnotpass';

describe('ConsumersModule', (): void => {
  let authConsumerUseCase: AuthConsumerUseCase;
  let createConsumerUseCase: CreateConsumerUseCase;
  
  beforeEach(async(): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthProviderModule],
      providers: [
        AuthProviderService,
        AuthConsumerUseCase,
        CreateConsumerUseCase,
        {
          provide: ConsumersRepository,
          useClass: ConsumersInMemoryRepository
        }
      ]
    }).compile();
  
    authConsumerUseCase = module.get<AuthConsumerUseCase>(AuthConsumerUseCase);
    createConsumerUseCase = module.get<CreateConsumerUseCase>(CreateConsumerUseCase);
  });
  
  it('should be defined', (): void => {
    expect(authConsumerUseCase).toBeDefined();
    expect(createConsumerUseCase).toBeDefined();
  });
  
  describe('AuthConsumerUseCase', (): void => {
    it('should be able to authenticate a consumer', async (): Promise<void> => {
      const consumer: ICreateConsumerRequest = {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password
      }
      
      await createConsumerUseCase.perform(consumer);
      
      const { token } = await authConsumerUseCase.perform({
        email: consumer.email,
        password
      });

      expect(token).toBeDefined();
    });
  });
});