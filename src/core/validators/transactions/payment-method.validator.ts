import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint
} from 'class-validator';

import { BaseValidator } from '../base.validator';

import { ICreateTransactionRequest, PaymentMethods } from '@types';

export function CheckPaymentMethod(values: typeof PaymentMethods, validationOptions: ValidationOptions) {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [values],
      validator: CheckPaymentMethodConstraint
    });
  }
}

@ValidatorConstraint({ name: 'CheckPaymentMethod' })
export class CheckPaymentMethodConstraint extends BaseValidator {
  validate(values: typeof PaymentMethods, validationArguments?: ValidationArguments): boolean {
    const { payment_method } = validationArguments.object as ICreateTransactionRequest;
    const constraints = Object.values(validationArguments.constraints[0]);
    
    return constraints.includes(payment_method);
  }
  
  defaultMessage(validationArguments?: ValidationArguments): string {
    const { property, constraints } = validationArguments;
    const objConstraints = Object.values(constraints[0]).join(', ');
    
    return `Invalid ${property} provided, acceptable options: ${objConstraints}.`;
  }
}