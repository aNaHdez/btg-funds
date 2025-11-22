import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'funds' },

  {
    path: 'funds',
    loadComponent: () =>
      import('./features/funds/pages/funds-list-page/funds-list-page.component')
        .then(m => m.FundsListPageComponent),
  },
  {
    path: 'portfolio',
    loadComponent: () =>
      import('./features/portfolio/pages/portfolio-page/portfolio-page.component')
        .then(m => m.PortfolioPageComponent),
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./features/transactions/pages/transactions-page/transactions-page.component')
        .then(m => m.TransactionsPageComponent),
  },

  { path: '**', redirectTo: 'funds' },
];
