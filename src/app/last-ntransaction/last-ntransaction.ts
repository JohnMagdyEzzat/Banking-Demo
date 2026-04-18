import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-last-ntransaction',
  imports: [FormsModule],
  templateUrl: './last-ntransaction.html',
  styleUrl: './last-ntransaction.css',
})
export class LastNTransaction {
  transactionCount = 0;
  isModalOpen = input.required<boolean>();
  openModal() {}
  closeModal() {}
  fetchTransactions() {}
}
