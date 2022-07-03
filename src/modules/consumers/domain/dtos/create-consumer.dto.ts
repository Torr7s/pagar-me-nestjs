import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsOptional,
  IsEmail,
  IsString
} from 'class-validator';

import { ConsumersEntity } from '@modules/consumers/infra/prisma/entities/consumers.entity';

import { Prisma } from '@prisma/client';

export class CreateConsumerDto extends ConsumersEntity {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsOptional()
  transactions?: Prisma.TransactionsUncheckedCreateNestedManyWithoutConsumerInput;
  
  @IsOptional()
  payables?: Prisma.PayablesUncheckedCreateNestedManyWithoutConsumerInput;
}