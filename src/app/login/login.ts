import { Component, inject } from '@angular/core';
import { FormInput } from '../common/components/form-input/form-input';
import { AppRoutingModule } from '../app.routes';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFormItem, IFormValidations } from '../common/interfaces/common-interfaces';
import { Router } from '@angular/router';
import { FormService } from '../common/services/form-service';
import { AuthService } from '../common/services/auth-service';
import { getFormValidationMessage } from '../common/functions/validation-functions';

@Component({
  selector: 'app-login',
  imports: [FormInput, AppRoutingModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  loginFormItems: IFormItem[] = [
    {
      id: 'email',
      label: 'email',
      inputType: 'email',
      placeholder: 'Enter your email',
      formControlName: 'email',
    },
    {
      id: 'password',
      label: 'password',
      inputType: 'password',
      placeholder: 'Enter your password',
      formControlName: 'password',
    },
  ];

  formValidations: IFormValidations[] = [];

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private formService = inject(FormService);
  private authService = inject(AuthService);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (this.loginForm.valid) {
      this.router.navigate(['/dashboard']);
      this.authService.login(this.loginForm.value.email as string);
      this.loginForm.reset();
    } else {
      const loginFormControlNames = Object.keys(this.loginForm.value);
      this.loginForm.markAllAsTouched();
      this.formValidations = this.formService.getFormItemsvalidationMessages(
        this.loginForm,
        loginFormControlNames,
      );
    }
  }

  getFormValidationMessage(formControlName: string) {
    return getFormValidationMessage(this.formValidations, formControlName);
  }
}
