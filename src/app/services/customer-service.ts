import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer } from '../interfaces/customerInterface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customersUrl = 'assets/data/customers.json';
  private http = inject(HttpClient);

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.customersUrl);
  }
}
