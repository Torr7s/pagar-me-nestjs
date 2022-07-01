import { Prisma } from '@prisma/client';

export class ConsumersEntity implements Prisma.ConsumersUncheckedCreateInput {
  id?: string;
  name: string
  email: string
  password: string
  transactions?: Prisma.TransactionsUncheckedCreateNestedManyWithoutConsumerInput;
  payables?: Prisma.PayablesUncheckedCreateNestedManyWithoutConsumerInput;
}