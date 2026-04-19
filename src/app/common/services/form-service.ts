import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import {
  loginValidationMessages,
  transactionCreationValidationMessages,
} from '../validationMessages';
import { capitalizeFirstLetter } from '../functions/text-functions';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  getFormItemsvalidationMessages(form: FormGroup, formControlNames: string[]) {
    return formControlNames.map((formControlName) => {
      return { message: this.getValidationMessage(form, formControlName), formControlName };
    });
  }

  private getValidationMessage(form: FormGroup, formControlName: string) {
    const control = form.get(formControlName) as AbstractControl;
    formControlName = capitalizeFirstLetter(formControlName);
    if (control.touched && control.invalid) {
      if (control.errors) {
        if (control.errors['required']) {
          return loginValidationMessages.requiredValidationMessage(formControlName);
        }
        if (control.errors['email']) {
          return loginValidationMessages.emailValidationMessage(formControlName);
        }
        if (control.errors['characterNumberRange']) {
          return transactionCreationValidationMessages.numberOfCharacters(
            formControlName,
            control.errors['characterNumberRange'].minLength,
            control.errors['characterNumberRange'].maxLength,
          );
        }
        if (control.errors['numberRange']) {
          return transactionCreationValidationMessages.numberBetween(
            formControlName,
            control.errors['numberRange'].minNumber,
            control.errors['numberRange'].maxNumber,
          );
        }
        if (control.errors['decimalPlaces']) {
          return transactionCreationValidationMessages.maxDecimals(
            formControlName,
            control.errors['decimalPlaces'].requiredMax,
          );
        }
        if (control.errors['futureDate']) {
          return transactionCreationValidationMessages.notInFutureDate(formControlName);
        }
        if (control.errors['insufficientAmount']) {
          return transactionCreationValidationMessages.insufficientAmount();
        }
      }
      console.error(
        'Unkown Error please add it to form service getValidationMessage if conditions',
      );
      console.error('Errors names: ', control.errors);
      return 'unknown error';
    }
    return '';
  }
}
