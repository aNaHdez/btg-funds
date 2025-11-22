import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { AccountRepository } from './core/domain/repositories/account.repository';
import { AccountRepositoryImpl } from './core/infrastructure/supabase/account.repository.impl';
import { FundRepository } from './core/domain/repositories/fund.repository';
import { FundRepositoryImpl } from './core/infrastructure/supabase/fund.repository.impl';
import { TransactionRepository } from './core/domain/repositories/transaction.repository';
import { TransactionRepositoryImpl } from './core/infrastructure/supabase/transaction.repository.impl';
import { SubscriptionRepository } from './core/domain/repositories/subscription.repository';
import { SubscriptionRepositoryImpl } from './core/infrastructure/supabase/subscription.repository.impl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    { provide: AccountRepository, useClass: AccountRepositoryImpl },
    { provide: FundRepository, useClass: FundRepositoryImpl },
    { provide: TransactionRepository, useClass: TransactionRepositoryImpl },
    { provide: SubscriptionRepository, useClass: SubscriptionRepositoryImpl },
    providePrimeNG({
      theme: {
        preset: Aura,
      },
      ripple: true,
    }),
  ],
};
