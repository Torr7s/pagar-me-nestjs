import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';
import { PayablesEntity } from '@modules/payables/infra/prisma/entities/payables.entity';

export class ListPayablesResponse extends PayablesEntity {
  @ApiProperty()
  id: string;
  
  @ApiProperty()
  status: string;
  
  @ApiProperty()
  payment_date: Date;
  
  @ApiProperty()
  fee: string;
  
  @ApiProperty()
  consumerId: string;
  
  @ApiProperty()
  transactionId: string;
  
  @ApiProperty()
  createdAt: Date;
  
  @ApiProperty()
  updatedAt: Date;
}