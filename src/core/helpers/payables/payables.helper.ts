import { Prisma, Transactions } from '@prisma/client';
import {
  ICreatePayableRequest,
  PayableStatus,
  PaymentMethodFees
} from '@types';

import { Decimal } from '@prisma/client/runtime';

export class PayablesHelper {
  constructor(private transaction: Transactions) {};
  
  private static calculateFee(transactionValue: number, discount: number): Prisma.Decimal {
    const result: number = transactionValue - (transactionValue * discount);
    
    return new Decimal(result);
  }
  
  getDebitFee(): ICreatePayableRequest {
    const { id, value, consumerId, createdAt } = this.transaction;
    
    const fee: Prisma.Decimal = PayablesHelper.calculateFee(+value, PaymentMethodFees.DEBIT);

    return {
      status: PayableStatus.DEBIT,
      payment_date: createdAt,
      fee,
      consumerId,
      transactionId: id
    }
  }
  
  getCreditFee(): ICreatePayableRequest {
    const { id, value, consumerId, createdAt } = this.transaction;
    
    const fee: Prisma.Decimal = PayablesHelper.calculateFee(+value, PaymentMethodFees.CREDIT);
  
    const createdAtPlus30Days = createdAt.setDate(createdAt.getDate() + 30);
    const createdAtDate = new Date(createdAtPlus30Days);
    
    return {
      status: PayableStatus.CREDIT,
      payment_date: createdAtDate,
      fee,
      consumerId,
      transactionId: id
    }
  }
}