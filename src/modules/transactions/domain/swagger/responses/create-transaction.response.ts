import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';
import { TransactionsEntity } from '@modules/transactions/infra/prisma/entities/transactions.entity';

export class CreateTransactionResponse implements TransactionsEntity {
  @ApiProperty()
  id: string;
  
  @ApiProperty()
  value: string;
  
  @ApiProperty()
  description: string;
  
  @ApiProperty()
  payment_method: string;
  
  @ApiProperty()
  card_number: string;
  
  @ApiProperty()
  card_owner: string;
  
  @ApiProperty()
  card_expiration_date: Date;
  
  @ApiProperty()
  card_cvv: string;
  
  @ApiProperty()
  consumerId: string;
  
  @ApiProperty()
  payables: Prisma.PayablesUncheckedCreateNestedOneWithoutTransactionInput
}