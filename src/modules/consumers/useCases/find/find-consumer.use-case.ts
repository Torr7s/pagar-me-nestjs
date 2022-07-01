import { BadRequestException, Injectable } from '@nestjs/common';
import { Consumers } from '@prisma/client';

import { ConsumersRepository } from '@modules/consumers/infra/prisma/repositories/consumers.repository';

@Injectable()
export class FindConsumerUseCase {
  constructor(private consumersRepository: ConsumersRepository) {};
  
  async perform(id: string): Promise<Consumers> {
    const consumer: Consumers = await this.consumersRepository.findOne(id);
    
    if (!consumer) {
      throw new BadRequestException(
        'No consumer was found with this id.',
        'There is no consumer record with this id in the system.'
      );
    }
    
    return consumer;
  }
}
