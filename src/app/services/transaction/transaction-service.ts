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
  // private transactionTypesUrl = 'assets/data/transactions.json';
  // private transactionCategoriesUrl = 'assets/data/transactions.json';

  getAllTransactions(): Observable<ITransaction[]> {
    if (!(this.transactionsSubject.value.length > 0)) {
      return this.http.get<ITransaction[]>(this.transactionsUrl).pipe(
        tap((transactions) => {
          if (transactions) {
            this.transactionsSubject.next(transactions);
          }
        }),
      );
    } else {
      return this.transactions$;
    }
  }

  addTransaction(transaction: ITransaction): Observable<ITransaction[]> {
    return this.getAllTransactions().pipe(
      take(1),
      map((transactions) => {
        console.log('here');

        return [...transactions, transaction];
      }),
      tap((updatedTransactions) => {
        this.transactionsSubject.next(updatedTransactions);
      }),
    );
  }

  // getTransactionTypes(): Observable<ITransactionType> {
  //   return this.http.get<ITransactionType>(this.transactionTypesUrl);
  // }
  // getTransactionCategories(): Observable<ITransactionCategories> {
  //   return this.http.get<ITransactionCategories>(this.transactionCategoriesUrl);
  // }
}
