import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';
import { ConsumersEntity } from '@modules/consumers/infra/prisma/entities/consumers.entity';

export class CreateConsumerResponse implements ConsumersEntity {
  @ApiProperty()
  id: string;
  
  @ApiProperty()
  name: string;
  
  @ApiProperty()
  email: string;
  
  @ApiProperty()
  password: string;
  
  @ApiProperty()
  createdAt: Date;
  
  @ApiProperty()
  updatedAt: Date;
  
  @ApiProperty()
  transactions?: Prisma.TransactionsUncheckedCreateNestedManyWithoutConsumerInput;
  
  @ApiProperty()
  payables?: Prisma.PayablesUncheckedCreateNestedManyWithoutConsumerInput;
}