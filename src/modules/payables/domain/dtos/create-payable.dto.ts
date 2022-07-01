import { Prisma } from '@prisma/client';
import {
  IsNotEmpty, IsOptional,
  IsDateString,
  IsDecimal,
  IsString
} from 'class-validator';

import { PayablesEntity } from '@modules/payables/infra/prisma/entities/payables.entity';

export class CreatePayableDto extends PayablesEntity {
  @IsString()
  @IsOptional()
  status?: string;
  
  @IsDateString()
  @IsOptional()
  payment_date?: string | Date;
  
  @IsDecimal()
  @IsOptional()
  fee?: string | Prisma.Decimal;
  
  @IsString()
  @IsNotEmpty()
  consumerId: string;
  
  @IsString()
  @IsNotEmpty()
  transactionId: string;
}