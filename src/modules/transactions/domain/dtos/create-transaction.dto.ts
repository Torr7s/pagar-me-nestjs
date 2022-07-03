import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsOptional,
  IsDateString,
  IsDecimal,
  IsString, IsUUID,
  MaxLength, MinLength
} from 'class-validator';

import { TransactionsEntity } from '@modules/transactions/infra/prisma/entities/transactions.entity';

import { CheckPaymentMethod } from '@core/validators/transactions/payment-method.validator';

import { Prisma } from '@prisma/client';

import { PaymentMethods } from '@types';

export class CreateTransactionDto extends TransactionsEntity {
  @ApiProperty()
  @IsDecimal()
  @IsNotEmpty()
  value: string | Prisma.Decimal;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
  
  @ApiProperty()
  @CheckPaymentMethod(PaymentMethods, { each: true })
  @IsString()
  @IsNotEmpty()
  payment_method: string;
  
  @ApiProperty()
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  @IsNotEmpty()
  card_number: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  card_owner: string;
  
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  card_expiration_date: string | Date;
  
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  @IsNotEmpty()
  card_cvv: string;
  
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  consumerId: string;
  
  @IsOptional()
  payables?: Prisma.PayablesUncheckedCreateNestedOneWithoutTransactionInput;
}