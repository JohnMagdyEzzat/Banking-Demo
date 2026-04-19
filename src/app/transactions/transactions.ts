import { Component, inject, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction/transaction-service';
import { AsyncPipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, take, tap } from 'rxjs';
import { ITransaction } from '../interfaces/transactionInterface';
import { Card } from '../common/components/card/card';
import { Filters } from '../common/components/filters/filters';
import { IFilterItems } from '../common/interfaces/common-interfaces';
import { filterWith as filterWith, sort } from '../common/functions/filter-sort-functions';
import { CsvService } from '../common/services/csv-service';
import { MonthlyInsights } from '../monthly-insights/monthly-insights';
import { AccountService } from '../services/account/account-service';

@Component({
  selector: 'app-transactions',
  imports: [Card, Filters, AsyncPipe, MonthlyInsights],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions implements OnInit {
  private transactionService = inject(TransactionService);
  private csvService = inject(CsvService);
  private accountService = inject(AccountService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  selectedTransactions$: Observable<ITransaction[] | undefined> | undefined;
  filteredData$: Observable<ITransaction[] | undefined> | undefined;
  sortedData$: Observable<ITransaction[] | undefined> | undefined;
  lastNTransactions$: Observable<ITransaction[] | undefined> | undefined;
  filteredLastNTransactions$: Observable<ITransaction[] | undefined> | undefined;

  accountNumber = '';
  headerElements = ['id', 'date'];
  bodyElements = ['type', 'amount'];
  footerElements = ['merchant', 'category'];
  isMonthlyPanelOpen = false;

  ngOnInit(): void {
    this.accountNumber = this.route.snapshot.paramMap.get('id') || '';
    this.transactionService.getAllTransactions().subscribe();
    this.selectedTransactions$ = this.transactionService.transactions$.pipe(
      map((transactions) => {
        return transactions.filter((transaction) => transaction.accountId === this.accountNumber);
      }),
    );
    this.filteredData$ = this.selectedTransactions$;
    this.lastNTransactions$ = this.transactionService.lastNTransactions$;
    this.filteredLastNTransactions$ = this.lastNTransactions$;
  }

  goBack() {
    this.accountNumber = this.route.snapshot.paramMap.get('id') || '';
    let customerID = '';

    this.accountService
      .getAccountByAccountNumber(this.accountNumber)
      .pipe(
        take(1),
        tap((account) => {
          customerID = account?.customerId || '';
          this.router.navigate([`customer/${customerID}`]);
        }),
      )
      .subscribe();
  }

  onFilterChange(activeFiltersKeyValues: IFilterItems) {
    this.filteredData$ = this.selectedTransactions$?.pipe(
      map((transactions) => {
        return filterWith(transactions, activeFiltersKeyValues);
      }),
    );
    this.filteredLastNTransactions$ = this.lastNTransactions$?.pipe(
      map((transactions) => {
        return filterWith(transactions, activeFiltersKeyValues);
      }),
    );
  }

  onSort(sortValue: string) {
    this.filteredData$ = this.filteredData$?.pipe(
      map((transactions) => {
        return sort(transactions, sortValue);
      }),
    );

    this.filteredLastNTransactions$ = this.filteredLastNTransactions$?.pipe(
      map((transactions) => {
        return sort(transactions, sortValue);
      }),
    );
  }

  onCreateNewTransaction() {
    this.router.navigate([`transactions/${this.accountNumber}/new`]);
  }

  isLastNTransaction() {
    let isLastNTransaction = false;
    this.lastNTransactions$
      ?.pipe(
        take(1),
        tap((transactions) => {
          if (transactions) {
            transactions.length > 0 ? (isLastNTransaction = true) : (isLastNTransaction = false);
          }
        }),
      )
      .subscribe();
    return isLastNTransaction;
  }

  onExportTransactions() {
    if (this.isLastNTransaction()) {
      this.filteredLastNTransactions$
        ?.pipe(
          take(1),
          tap((transactions) => {
            this.csvService.downloadAsCSV(transactions || [], 'transactions.csv');
          }),
        )
        .subscribe();
    } else {
      this.filteredData$
        ?.pipe(
          take(1),
          tap((transactions) => {
            this.csvService.downloadAsCSV(transactions || [], 'transactions.csv');
          }),
        )
        .subscribe();
    }
  }

  onToggleMonthlyInsights() {
    this.selectedTransactions$ = this.transactionService.getTransactionsByAccountNumber(
      this.accountNumber,
    );
    this.isMonthlyPanelOpen = !this.isMonthlyPanelOpen;
  }
}
