import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ICustomer } from '../interfaces/customerInterface';
import { CustomerService } from '../services/customer/customer-service';
import { Observable, take, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CapitalizePipe } from '../common/pipes/capitalize-pipe';
import { IAccount } from '../interfaces/accountInterface';
import { AccountService } from '../services/account/account-service';
import { Table } from '../table/table';
import { LastNTransaction } from '../last-ntransaction/last-ntransaction';
import { TransactionService } from '../services/transaction/transaction-service';
import { CsvService } from '../common/services/csv-service';
import { ITransaction } from '../interfaces/transactionInterface';

@Component({
  selector: 'app-customer-details',
  imports: [CommonModule, CapitalizePipe, Table, LastNTransaction],
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.css',
})
export class CustomerDetails implements OnInit {
  customerService = inject(CustomerService);
  accountService = inject(AccountService);
  transactionService = inject(TransactionService);
  csvService = inject(CsvService);

  route = inject(ActivatedRoute);
  router = inject(Router);
  location = inject(Location);

  customerData$: Observable<ICustomer | undefined> | undefined;
  accountsData$: Observable<IAccount[] | undefined> | undefined;
  selectedTransactions$: Observable<ITransaction[] | undefined> | undefined;

  accountsTableCustomeHeaders = ['Account Number', 'Type', 'Balance', 'Status'];
  accountsTableHeaders = ['id', 'type', 'balance', 'status'];
  actions = ['View Transactions', 'Mini Statement', 'Export'];
  isModalOpen = false;
  accountNumber: string = '';

  ngOnInit(): void {
    const customerID = this.route.snapshot.paramMap.get('id') || '';
    this.customerData$ = this.customerService.getCustomer(customerID);
    this.accountsData$ = this.accountService.getCustomerAccounts(customerID);
  }

  goBack() {
    this.router.navigate(['dashboard']);
  }

  onViewTransactions(event: { item: IAccount; action: string }) {
    if (event.action == this.actions[0]) {
      // View Transactions action
      this.transactionService.resetLastNTrasaction();
      this.router.navigate([`/transactions/${event.item.id}`]);
    }
    if (event.action == this.actions[1]) {
      //Mini Statement action
      this.isModalOpen = true;
      this.accountNumber = event.item.id;
    }
    if (event.action == this.actions[2]) {
      //Export action
      this.accountNumber = event.item.id;
      this.selectedTransactions$ = this.transactionService.getTransactionsByAccountNumber(
        this.accountNumber,
      );
      this.selectedTransactions$
        ?.pipe(
          take(1),
          tap((transactions) => {
            this.csvService.downloadAsCSV(transactions || [], 'transactions.csv');
          }),
        )
        .subscribe();
    }
  }

  onCloseModal() {
    this.isModalOpen = false;
  }
}
