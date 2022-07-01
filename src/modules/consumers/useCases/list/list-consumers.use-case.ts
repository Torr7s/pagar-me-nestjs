import { BadRequestException, Injectable } from '@nestjs/common';
import { Consumers } from '@prisma/client';

import { ConsumersRepository } from '@modules/consumers/infra/prisma/repositories/consumers.repository';

@Injectable()
export class ListConsumersUseCase {
  constructor(private consumersRepository: ConsumersRepository) {};

  async perform(): Promise<Consumers[]> {
    const consumers: Consumers[] = await this.consumersRepository.list();

    if (!consumers.length) {
      throw new BadRequestException(
        'No consumers were found.',
        'There is no consumer registration in the system.'
      );
    }

    return consumers;
  }
}