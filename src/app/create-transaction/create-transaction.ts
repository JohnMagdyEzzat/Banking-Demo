import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  ITransaction,
  TRANSACTIONCATEGORIESARRAY,
  TransactionType,
} from '../interfaces/transactionInterface';
import { FormInput } from '../common/components/form-input/form-input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../common/services/form-service';
import { getFormValidationMessage } from '../common/functions/validation-functions';
import { TransactionCreationValidators } from '../validators/transaction-creation-validators';
import { AccountService } from '../services/account/account-service';
import { Observable, switchMap, take, tap } from 'rxjs';
import { IAccount } from '../interfaces/accountInterface';
import { ActivatedRoute, Router } from '@angular/router';
import { IdGeneratorService } from '../common/services/id-generator-service';
import { TransactionService } from '../services/transaction/transaction-service';

@Component({
  selector: 'app-create-transaction',
  imports: [FormInput, ReactiveFormsModule, NgClass],
  templateUrl: './create-transaction.html',
  styleUrl: './create-transaction.css',
})
export class CreateTransaction implements OnInit {
  private fb = inject(FormBuilder);
  private formService = inject(FormService);
  private accountService = inject(AccountService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private IDGen = inject(IdGeneratorService);
  private transactionService = inject(TransactionService);

  categories = TRANSACTIONCATEGORIESARRAY;
  types = TransactionType;

  typesArray: { code: string; label: string }[];
  newTransactionForm: FormGroup;
  formValidations: { message: string; formControlName: string }[] = [];

  account$: Observable<IAccount | undefined> | undefined;
  accountBalance: number = 0;
  customerID: string = '';
  accountNumber: string = '';

  constructor() {
    this.typesArray = this.types.code.map((val, i) => ({
      code: val,
      label: this.types.label[i],
    }));

    this.newTransactionForm = this.fb.group({
      type: ['', [Validators.required]],
      amount: [''], // validators are set on submit
      date: ['', [Validators.required, TransactionCreationValidators.futureDate]],
      merchant: [
        '',
        [Validators.required, TransactionCreationValidators.characterNumberRange(3, 50)],
      ],
      category: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.accountNumber = this.route.snapshot.paramMap.get('id') || '';
    this.account$ = this.accountService.getAccountByAccountNumber(this.accountNumber);
    this.account$
      .pipe(
        take(1),
        tap((account) => {
          this.accountBalance = account?.balance || 0;
          this.customerID = account?.customerId || '';
        }),
      )
      .subscribe();
  }

  calculateNewBalance() {
    const amountControl = this.newTransactionForm.get('amount');

    this.checkNewBalance();

    if (amountControl?.valid) {
      if (this.newTransactionForm.value.type == 'Debit') {
        this.accountBalance -= Number(this.newTransactionForm.value.amount);
      } else if (this.newTransactionForm.value.type == 'Credit') {
        this.accountBalance += Number(this.newTransactionForm.value.amount);
      }
    }
  }

  checkNewBalance() {
    this.newTransactionForm
      .get('amount')
      ?.setValidators([
        Validators.required,
        TransactionCreationValidators.amountRange(1, 100000),
        TransactionCreationValidators.maxDeciaml(2),
        TransactionCreationValidators.validateBalance(
          this.newTransactionForm.value.type,
          this.accountBalance,
        ),
      ]);

    this.newTransactionForm.get('amount')?.updateValueAndValidity();
    this.newTransactionForm.updateValueAndValidity();
  }

  resetValidations() {
    this.formValidations = [];
    this.newTransactionForm.updateValueAndValidity();
  }

  constructPayload(): ITransaction {
    const transactionID = this.IDGen.generateOLDID();
    const date = this.newTransactionForm.value.date;
    const amount = Number(this.newTransactionForm.value.amount);
    const type = this.newTransactionForm.value.type;
    const merchant = this.newTransactionForm.value.merchant;
    const category = this.newTransactionForm.value.category;

    const transaction: ITransaction = {
      id: transactionID,
      accountId: this.accountNumber,
      date,
      type,
      amount,
      merchant,
      category,
    };
    return transaction;
  }

  onSubmitNewTransaction() {
    this.checkNewBalance();
    if (this.newTransactionForm.valid) {
      this.resetValidations();
      this.calculateNewBalance();
      const transactionPayload = this.constructPayload();
      this.transactionService
        .addTransaction(transactionPayload)
        .pipe(
          take(1),
          tap(() => this.newTransactionForm.reset()),
          tap(() => this.router.navigate([`transactions/${this.accountNumber}`])),
        )
        .subscribe();
      this.accountService
        .updateBalance(this.accountNumber, this.accountBalance)
        .pipe(
          take(1),
          switchMap((account) => account),
        )
        .subscribe();
    } else {
      this.showTransactionFormValidation();
    }
  }

  showTransactionFormValidation() {
    const newTransactionFormItems = Object.keys(this.newTransactionForm.value);
    this.newTransactionForm.markAllAsTouched();
    this.formValidations = this.formService.getFormItemsvalidationMessages(
      this.newTransactionForm,
      newTransactionFormItems,
    );
  }

  getFormValidationMessage(formControlName: string) {
    return getFormValidationMessage(this.formValidations, formControlName);
  }

  goBack() {
    this.router.navigate([`transactions/${this.accountNumber}`]);
  }
}
