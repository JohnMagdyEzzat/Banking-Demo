import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';
import { ITransaction } from '../../interfaces/transactionInterface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private http = inject(HttpClient);

  private transactionsUrl = 'assets/data/transactions.json';

  private transactionsSubject = new BehaviorSubject<ITransaction[]>([]);
  transactions$ = this.transactionsSubject.asObservable();

  private lastNTransactionsSubject = new BehaviorSubject<ITransaction[]>([]);
  lastNTransactions$ = this.lastNTransactionsSubject.asObservable();

  // private transactionTypesUrl = 'assets/data/transactions.json';
  // private transactionCategoriesUrl = 'assets/data/transactions.json';

  getAllTransactions(): Observable<ITransaction[]> {
    if (!(this.transactionsSubject.value.length > 0)) {
      return this.http
        .get<ITransaction[]>(this.transactionsUrl)
        .pipe(tap((transactions) => this.transactionsSubject.next(transactions)));
    }
    return this.transactions$;
  }

  addTransaction(transaction: ITransaction): Observable<ITransaction[]> {
    return this.getAllTransactions().pipe(
      take(1),
      map((transactions) => {
        return [...transactions, transaction];
      }),
      tap((updatedTransactions) => {
        this.transactionsSubject.next(updatedTransactions);
      }),
    );
  }

  getTransactionsByAccountNumber(accountNumber: string) {
    return this.getAllTransactions().pipe(
      map((transactions) => {
        return transactions.filter((transaction) => transaction.accountId === accountNumber);
      }),
    );
  }

  getLastNTrasaction(transactionCount: number, transactionID: string) {
    return this.getTransactionsByAccountNumber(transactionID).pipe(
      map((transactions) => {
        return transactions.sort((t1, t2) => {
          const t1Date = new Date(t1.date).getTime();
          const t2Date = new Date(t2.date).getTime();
          return t2Date - t1Date;
        });
      }),
      map((transactions) => {
        return transactions.slice(0, transactionCount);
      }),
      tap((transactions) => {
        this.lastNTransactionsSubject.next(transactions);
      }),
    );
  }

  resetLastNTrasaction() {
    this.lastNTransactionsSubject.next([]);
  }

  // getTransactionTypes(): Observable<ITransactionType> {
  //   return this.http.get<ITransactionType>(this.transactionTypesUrl);
  // }
  // getTransactionCategories(): Observable<ITransactionCategories> {
  //   return this.http.get<ITransactionCategories>(this.transactionCategoriesUrl);
  // }
}
