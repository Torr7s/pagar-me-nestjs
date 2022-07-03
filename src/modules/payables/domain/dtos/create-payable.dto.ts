import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsOptional,
  IsDateString,
  IsDecimal,
  IsString
} from 'class-validator';

import { PayablesEntity } from '@modules/payables/infra/prisma/entities/payables.entity';

import { Prisma } from '@prisma/client';

export class CreatePayableDto extends PayablesEntity {
  @ApiProperty()
  @IsString()
  @IsOptional()
  status?: string;
  
  @ApiProperty()
  @IsDateString()
  @IsOptional()
  payment_date?: string | Date;
  
  @ApiProperty()
  @IsDecimal()
  @IsOptional()
  fee?: string | Prisma.Decimal;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  consumerId: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  transactionId: string;
}