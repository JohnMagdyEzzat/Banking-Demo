import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth-service';
import { CustomerService } from '../services/customer/customer-service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ICustomer } from '../interfaces/customerInterface';
import { Table } from '../table/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Table],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private authService = inject(AuthService);
  private customerService = inject(CustomerService);
  private router = inject(Router);

  customersData$: Observable<ICustomer[]> | undefined;
  userEmail = '';
  dashboardTableHeaders = ['CIF', 'name', 'segment', 'email'];
  selectedCustomer?: ICustomer;
  isLoggedIn = this.authService.isLoggedIn();

  ngOnInit(): void {
    this.userEmail = this.authService.getToken() || '';
    this.customersData$ = this.customerService.getCustomers();
  }

  onViewDetails(customer: ICustomer) {
    this.selectedCustomer = customer;
    this.router.navigate([`/customer/${customer.CIF}`]);
  }
}
