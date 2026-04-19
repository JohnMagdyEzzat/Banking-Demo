import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../services/transaction/transaction-service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-last-ntransaction',
  imports: [FormsModule],
  templateUrl: './last-ntransaction.html',
  styleUrl: './last-ntransaction.css',
})
export class LastNTransaction {
  transactionService = inject(TransactionService);
  router = inject(Router);

  accountNumber = input.required<string>();
  isModalOpenInput = input.required<boolean>();
  close = output<boolean>();

  transactionCount = 0;
  isModalOpen = signal(false);

  constructor() {
    effect(() => {
      this.isModalOpen.set(this.isModalOpenInput());
    });
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.close.emit(false);
  }

  fetchTransactions() {
    this.transactionService
      .getLastNTrasaction(this.transactionCount, this.accountNumber())
      .pipe(take(1))
      .subscribe();
    this.router.navigate([`transactions/${this.accountNumber()}`]);
  }
}
