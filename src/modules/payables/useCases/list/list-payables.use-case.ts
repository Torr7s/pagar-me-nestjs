import { BadRequestException, Injectable } from '@nestjs/common';
import { Payables } from '@prisma/client';

import { PayablesRepository } from '@modules/payables/infra/prisma/repositories/payables.repository';

@Injectable()
export class ListPayablesUseCase {
  constructor(private payablesRepository: PayablesRepository) {};
  
  async perform(status?: string): Promise<Payables[]> {
    const payableStatus = ['waiting_funds', 'paid'];
    
    if (!status || !payableStatus[status]) status = 'paid';
    
    const payables: Payables[] = await this.payablesRepository.list(status);
    
    if (!payables.length) {
      throw new BadRequestException(
        'No transactions were found.',
        'There are no transactions record with this status in the system.'
      );
    }
    
    return payables;
  }
}