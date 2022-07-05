import { Prisma } from '@prisma/client';

export class TransactionsEntity implements Prisma.TransactionsUncheckedCreateInput {
  value: string | Prisma.Decimal;
  description: string;
  payment_method: string;
  card_number: string;
  card_owner: string;
  card_expiration_date: string | Date;
  card_cvv: string;
  consumerId?: string;
  payables?: Prisma.PayablesUncheckedCreateNestedOneWithoutTransactionInput;
}