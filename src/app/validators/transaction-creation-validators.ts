import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TransactionCreationValidators {
  static characterNumberRange(minLength: number, maxLength: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const notBetweenMinAndMaxCharacters =
        control.value.length < minLength || control.value.length > maxLength;

      return notBetweenMinAndMaxCharacters
        ? { characterNumberRange: { actual: control.value.length, minLength, maxLength } }
        : null;
    };
  }

  static amountRange(minNumber: number, maxNumber: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const notBetweenMinAndMaxNumbers = control.value < minNumber || control.value > maxNumber;

      return notBetweenMinAndMaxNumbers
        ? { numberRange: { actual: control.value, minNumber, maxNumber } }
        : null;
    };
  }

  static maxDeciaml(maxDecimalPoints: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const parts = control.value.split('.');

      if (parts.length === 2) {
        const decimals = parts[1].length;
        if (decimals > maxDecimalPoints) {
          return { decimalPlaces: { requiredMax: maxDecimalPoints, actual: decimals } };
        }
      }

      return null;
    };
  }

  static futureDate = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const controlDate = new Date(control.value);
    const todayDate = new Date();

    const isDateInFuture = controlDate > todayDate;
    return isDateInFuture ? { futureDate: {} } : null;
  };

  static validateBalance(transactionType: string, accountBalance: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const transactionAmmount = control.value;

      if (transactionType == 'Debit') {
        const newBalance = accountBalance - transactionAmmount;
        if (newBalance < 0) {
          return { insufficientAmount: true };
        }
      } else {
        return null;
      }
      return null;
    };
  }
}
