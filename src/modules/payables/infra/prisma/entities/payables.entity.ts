import { Prisma } from '@prisma/client';

export class PayablesEntity implements Prisma.PayablesUncheckedCreateInput {
  status?: string;
  payment_date?: string | Date;
  fee?: string | Prisma.Decimal;
  consumerId: string;
  transactionId: string;
}