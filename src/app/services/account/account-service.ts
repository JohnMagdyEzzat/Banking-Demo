import { inject, Injectable } from '@angular/core';
import { IAccount } from '../../interfaces/accountInterface';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);

  private accountsUrl = 'assets/data/accounts.json';
  private accountsSubject = new BehaviorSubject<IAccount[]>([]);
  accounts$ = this.accountsSubject.asObservable();
  // Etag + Redux to use

  getAllAccounts(): Observable<IAccount[]> {
    if (!(this.accountsSubject.value.length > 0)) {
      return this.http
        .get<IAccount[]>(this.accountsUrl)
        .pipe(tap((account) => this.accountsSubject.next(account)));
    }
    return this.accounts$;
  }

  getCustomerAccounts(customerID: string): Observable<IAccount[] | undefined> {
    return this.getAllAccounts().pipe(
      map((accounts) => accounts.filter((account) => account.customerId === customerID)),
    );
  }

  getAccountByAccountNumber(accountNumber: string): Observable<IAccount | undefined> {
    return this.getAllAccounts().pipe(
      map((accounts) => accounts.find((account) => account.id === accountNumber)),
    );
  }

  updateAccounts(updatedAccount: IAccount) {
    const accounts$ = this.getAllAccounts();
    return accounts$.pipe(
      map((accounts) => {
        return accounts.map((account) => {
          if (account.id === updatedAccount.id) {
            account = updatedAccount;
          }
          return account;
        });
      }),
      tap((updatedAccounts) => {
        this.accountsSubject.next(updatedAccounts);
      }),
    );
  }

  updateBalance(accountNumber: string, balance: number) {
    const account$ = this.getAccountByAccountNumber(accountNumber);
    return account$.pipe(
      map((account) => {
        return { ...account, balance } as IAccount;
      }),
      map((newAccount) => {
        return this.updateAccounts(newAccount);
      }),
    );
  }
}
