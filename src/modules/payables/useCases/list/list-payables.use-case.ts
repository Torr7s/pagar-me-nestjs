import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { Payables } from '@prisma/client';

import { PayablesRepository } from '@modules/payables/infra/prisma/repositories/payables.repository';

import { PayableStatus } from '@types';

@Injectable()
export class ListPayablesUseCase {
  constructor(private payablesRepository: PayablesRepository) {};
  
  async perform(consumerId: string, status: string): Promise<Payables[]> {
    status = status.toLowerCase();
    
    const availableStatuses = Object.values(PayableStatus) as string[];
    
    // The challenge requests to be available (instead of paid) or waiting_funds
    if (!availableStatuses.includes(status)) {
      throw new NotFoundException(
        'Incorrect or misreported availability status',
        `Please, choose between ${availableStatuses.join(' or ')} as the status.`
      );
    }
    
    const payables: Payables[] = await this.payablesRepository.list(consumerId, status);

    if (!payables.length) {
      throw new BadRequestException(
        'No payables were found.',
        'There are no payables record with this status in the system.'
      );
    }
    
    return payables;
  }
}