import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { IFormItem } from '../interfaces/common-interfaces';
import { loginValidations } from '../validationMessages';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  getFormItemsvalidationMessages(form: FormGroup, formItems: IFormItem[]) {
    formItems.map((item) => {
      item.validationMessage = this.getValidationMessage(form, item.formControlName);
    });
    return formItems;
  }

  getValidationMessage(form: FormGroup, formControlName: string) {
    const control = form.get(formControlName) as AbstractControl;
    formControlName = formControlName.charAt(0).toUpperCase() + formControlName.slice(1);
    if (control.touched && control.invalid) {
      if (control.errors) {
        if (control.errors['required']) {
          return loginValidations.requiredValidationMessage(formControlName);
        }
        if (control.errors['email']) {
          return loginValidations.emailValidationMessage(formControlName);
        }
      }

      return 'invalid';
    }
    return '';
  }
}
