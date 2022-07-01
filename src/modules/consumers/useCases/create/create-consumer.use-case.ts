import { BadRequestException, Injectable } from '@nestjs/common';
import { Consumers } from '@prisma/client';

import { ConsumersRepository } from '@modules/consumers/infra/prisma/repositories/consumers.repository';

import { AuthProviderService } from '@shared/container/providers/auth/services/auth.service';

import { ICreateConsumerRequest } from '@types';

@Injectable()
export class CreateConsumerUseCase {
  constructor(
    private consumersRepository: ConsumersRepository,
    private authProviderService: AuthProviderService
  ) {};

  async perform({ name, email, password }: ICreateConsumerRequest): Promise<Consumers> {
    const consumer_exists: Consumers = await this.consumersRepository.findByEmail(email);

    if (consumer_exists) {
      throw new BadRequestException(
        'Consumer already exists.',
        'A consumer with the same email address is already registered in the system.'
      );
    }

    const hashed_password = await this.authProviderService.hashPassword(password);

    const new_consumer: Consumers = await this.consumersRepository.create({
      name,
      email,
      password: hashed_password
    });

    return new_consumer;
  }
}