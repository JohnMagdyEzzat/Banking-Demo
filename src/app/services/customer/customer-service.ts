import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, find, map, Observable, tap } from 'rxjs';
import { ICustomer } from '../../interfaces/customerInterface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private http = inject(HttpClient);

  private customersUrl = 'assets/data/customers.json';
  private customersSubject = new BehaviorSubject<ICustomer[]>([]);
  customers$ = this.customersSubject.asObservable();
  // Etag + Redux to use

  getCustomers(): Observable<ICustomer[]> {
    if (!(this.customersSubject.value.length > 0)) {
      return this.http
        .get<ICustomer[]>(this.customersUrl)
        .pipe(tap((data) => this.customersSubject.next(data)));
    }
    return this.customers$;
  }

  getCustomer(CIF: string): Observable<ICustomer | undefined> {
    return this.getCustomers().pipe(
      map((customers) => customers.find((customer) => customer.CIF === CIF)),
    );
  }
}
