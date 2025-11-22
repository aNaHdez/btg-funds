import { render, screen } from '@testing-library/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { LayoutShellComponent } from './layout-shell.component';
import { AccountStoreService } from '../../../core/state/account-store.service';
import { Account } from '../../../core/domain/models/account.model';

class MockAccountStoreService {
  account$ = of<Account | null>({
    id: '1',
    name: 'Cuenta demo',
    balance: 500000,
  });

  loadAccount = jasmine.createSpy('loadAccount');
}

describe('LayoutShellComponent (ATL)', () => {
  let store: MockAccountStoreService;

  beforeEach(async () => {
    store = new MockAccountStoreService();

    await render(LayoutShellComponent, {
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {
          provide: AccountStoreService,
          useValue: store,
        },
      ],
    });
  });

  it('should render header and tabs', () => {
    expect(screen.getByText(/BTG Manejo de Fondos/i)).toBeTruthy();
    expect(
      screen.getByText(/Simulador de suscripciones FPV \/ FIC/i)
    ).toBeTruthy();

    expect(screen.getByText(/Fondos disponibles/i)).toBeTruthy();
    expect(screen.getByText(/Mi portafolio/i)).toBeTruthy();
    expect(screen.getByText(/Historial/i)).toBeTruthy();
  });
});
