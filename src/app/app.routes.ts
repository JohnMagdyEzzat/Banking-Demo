import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { CustomerDetails } from './customer-details/customer-details';
import { Transactions } from './transactions/transactions';
import { CreateTransaction } from './create-transaction/create-transaction';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'customer/:id', component: CustomerDetails },
  { path: 'transactions', component: Transactions },
  { path: 'transactions/new', component: CreateTransaction },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
