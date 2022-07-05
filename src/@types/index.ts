import { Prisma } from '@prisma/client';

export interface IJWTPayload {
  sub: string;
}

export interface ICreateConsumerRequest {
  name: string;
  email: string;
  password: string;
}

export interface ICreateTransactionRequest {
  value: string | Prisma.Decimal;
  description: string;
  payment_method: string;
  card_number: string;
  card_owner: string;
  card_expiration_date: string | Date;
  card_cvv: string;
  consumerId?: string;
}

export interface IUpdateTransactionRequest extends Partial<ICreateTransactionRequest> {}

export interface ICreatePayableRequest {
  status?: string;
  payment_date?: string | Date;
  fee?: string | Prisma.Decimal;
  consumerId: string;
  transactionId: string;
}

export interface IAuthConsumerRequest {
  email: string;
  password: string;
}

export enum PaymentMethods {
  DEBIT = 'debit_card',
  CREDIT = 'credit_card'
}

export enum PaymentMethodFees {
  DEBIT = 0.03,
  CREDIT = 0.05
}

export enum PayableStatus {
  DEBIT = 'paid',
  CREDIT = 'waiting_funds'
}