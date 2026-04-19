import { Component, inject, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction/transaction-service';
import { AsyncPipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ITransaction } from '../interfaces/transactionInterface';
import { Card } from '../common/components/card/card';
import { Filters } from '../common/components/filters/filters';
import { IFilterItems } from '../common/interfaces/common-interfaces';
import { filterWith as filterWith, sort } from '../common/functions/filter-sort-functions';

@Component({
  selector: 'app-transactions',
  imports: [Card, Filters, AsyncPipe],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions implements OnInit {
  private transactionService = inject(TransactionService);
  private location = inject(Location);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  selectedTransactions$: Observable<ITransaction[] | undefined> | undefined;
  filteredData$: Observable<ITransaction[] | undefined> | undefined;
  lastNTransactions$: Observable<ITransaction[] | undefined> | undefined;
  filteredLastNTransactions$: Observable<ITransaction[] | undefined> | undefined;

  accountNumber = '';
  headerElements = ['id', 'date'];
  bodyElements = ['type', 'amount'];
  footerElements = ['merchant', 'category'];

  ngOnInit(): void {
    this.accountNumber = this.route.snapshot.paramMap.get('id') || '';
    this.selectedTransactions$ = this.transactionService.getTransactionByID(this.accountNumber);
    this.lastNTransactions$ = this.transactionService.lastNTransactions$;
    this.filteredData$ = this.selectedTransactions$;
    this.filteredLastNTransactions$ = this.lastNTransactions$;
  }

  goBack() {
    this.location.back();
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
}
