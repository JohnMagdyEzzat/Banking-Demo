import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ICustomer } from '../interfaces/customerInterface';
import { CustomerService } from '../services/customer/customer-service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CapitalizePipe } from '../common/pipes/capitalize-pipe';
import { IAccount } from '../interfaces/accountInterface';
import { AccountService } from '../services/account/account-service';

@Component({
  selector: 'app-customer-details',
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.css',
})
export class CustomerDetails implements OnInit {
  customerService = inject(CustomerService);
  accountService = inject(AccountService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  customerData$: Observable<ICustomer | undefined> | undefined;
  accountData$: Observable<IAccount[] | undefined> | undefined;

  ngOnInit(): void {
    const customerID = this.route.snapshot.paramMap.get('id') || '';
    this.customerData$ = this.customerService.getCustomer(customerID);
    this.accountData$ = this.accountService.getCustomerAccounts(customerID);
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
