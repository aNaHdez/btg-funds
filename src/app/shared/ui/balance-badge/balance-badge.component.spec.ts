import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';

import { BalanceBadgeComponent } from './balance-badge.component';
import { AccountStoreService } from '../../../core/state/account-store.service';
import { Account } from '../../../core/domain/models/account.model';

class MockAccountStoreService {
  account$ = of<Account | null>({
    id: '1',
    name: 'Cuenta de prueba',
    balance: 123456,
  });

  loadAccount = jasmine.createSpy('loadAccount');
}

describe('BalanceBadgeComponent (ATL)', () => {
  let store: MockAccountStoreService;

  beforeEach(async () => {
    store = new MockAccountStoreService();

    await render(BalanceBadgeComponent, {
      providers: [
        {
          provide: AccountStoreService,
          useValue: store,
        },
      ],
    });
  });

  it('should call loadAccount on init', () => {
    expect(store.loadAccount).toHaveBeenCalled();
  });

  it('should render account label and name', () => {
    expect(screen.getByText(/Saldo disponible/i)).toBeTruthy();
    expect(screen.getByText(/Cuenta de prueba/i)).toBeTruthy();
  });
});
