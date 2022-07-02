import { Prisma, Transactions } from '@prisma/client';
import {
  ICreatePayableRequest,
  PayableStatus,
  PaymentMethodFees, PaymentMethods
} from '@types';

import { Decimal } from '@prisma/client/runtime';

export class PayablesHelper {
  constructor(private transaction: Transactions) {};
  
  private static calculateFee(transactionValue: number, discount: number): Prisma.Decimal {
    const result: number = transactionValue - (transactionValue * discount);
    
    return new Decimal(result);
  }
  
  getFee() {
    const { payment_method } = this.transaction;
    
    return payment_method === PaymentMethods.DEBIT ? this.getDebitFee() : this.getCreditFee();
  }
  
  private getDebitFee(): ICreatePayableRequest {
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
  
  private getCreditFee(): ICreatePayableRequest {
    const { id, value, consumerId, createdAt } = this.transaction;
    
    const fee: Prisma.Decimal = PayablesHelper.calculateFee(+value, PaymentMethodFees.CREDIT);
  
    const createdAtDate = createdAt.setDate(createdAt.getDate() + 30);
    const createdAtPlus30Days = new Date(createdAtDate);
    
    return {
      status: PayableStatus.CREDIT,
      payment_date: createdAtPlus30Days,
      fee,
      consumerId,
      transactionId: id
    }
  }
}