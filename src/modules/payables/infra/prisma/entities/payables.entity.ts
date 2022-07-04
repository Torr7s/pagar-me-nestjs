import { Prisma } from '@prisma/client';

export class PayablesEntity implements Prisma.PayablesUncheckedCreateInput {
  id?: string;
  status?: string;
  payment_date?: string | Date;
  fee?: string | Prisma.Decimal;
  consumerId: string;
  transactionId: string;
}