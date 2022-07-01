import { Prisma } from '@prisma/client';
import {
  IsNotEmpty, IsOptional,
  IsEmail,
  IsString
} from 'class-validator';

import { ConsumersEntity } from '@modules/consumers/infra/prisma/entities/consumers.entity';

export class CreateConsumerDto extends ConsumersEntity {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsOptional()
  transactions?: Prisma.TransactionsUncheckedCreateNestedManyWithoutConsumerInput;
  
  @IsOptional()
  payables?: Prisma.PayablesUncheckedCreateNestedManyWithoutConsumerInput;
}