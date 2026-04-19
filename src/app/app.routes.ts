import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { loginGuard } from './guards/login-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
    canActivate: [loginGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [AuthGuard],
  },
  {
    path: 'customer/:id',
    loadComponent: () =>
      import('./customer-details/customer-details').then((m) => m.CustomerDetails),
    canActivate: [AuthGuard],
  },
  {
    path: 'transactions',
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        loadComponent: () => import('./transactions/transactions').then((m) => m.Transactions),
      },
      {
        path: ':id/new',
        loadComponent: () =>
          import('./create-transaction/create-transaction').then((m) => m.CreateTransaction),
      },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
