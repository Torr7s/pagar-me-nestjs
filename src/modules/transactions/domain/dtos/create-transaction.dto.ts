import { Prisma } from '@prisma/client';
import {
  IsNotEmpty, IsOptional,
  IsDateString,
  IsDecimal,
  IsString, IsUUID,
  MaxLength, MinLength
} from 'class-validator';

import { TransactionsEntity } from '@modules/transactions/infra/prisma/entities/transactions.entity';

import { CheckPaymentMethod } from '@core/validators/transactions/payment-method.validator';

import { PaymentMethods } from '@types';

export class CreateTransactionDto extends TransactionsEntity {
  @IsDecimal()
  @IsNotEmpty()
  value: string | Prisma.Decimal;
  
  @IsString()
  @IsNotEmpty()
  description: string;
  
  @CheckPaymentMethod(PaymentMethods, { each: true })
  @IsString()
  @IsNotEmpty()
  payment_method: string;
  
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  @IsNotEmpty()
  card_number: string;
  
  @IsString()
  @IsNotEmpty()
  card_owner: string;
  
  @IsDateString()
  @IsNotEmpty()
  card_expiration_date: string | Date;
  
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  @IsNotEmpty()
  card_cvv: string;
  
  @IsUUID()
  @IsNotEmpty()
  consumerId: string;
  
  @IsOptional()
  payables?: Prisma.PayablesUncheckedCreateNestedOneWithoutTransactionInput;
}