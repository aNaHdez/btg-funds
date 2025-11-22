import { render, screen, fireEvent } from '@testing-library/angular';
import { FundListComponent } from './fund-list.component';
import { Fund } from '../../../core/domain/models/fund.model';

describe('FundListComponent (ATL)', () => {
  const funds: Fund[] = [
    { id: 1, name: 'Fondo 1', minAmount: 100000, category: 'FPV' },
    { id: 2, name: 'Fondo 2', minAmount: 200000, category: 'FIC' },
  ];

  it('should render each fund as a card', async () => {
    await render(FundListComponent, {
      componentProperties: { funds },
    });

    expect(screen.getByText('Fondo 1')).toBeTruthy();
    expect(screen.getByText('Fondo 2')).toBeTruthy();
  });

  it('should show empty message when there are no funds', async () => {
    await render(FundListComponent, {
      componentProperties: { funds: [] },
    });

    expect(
      screen.getByText('No hay fondos disponibles.')
    ).toBeTruthy();
  });

  it('should emit subscribe when a child card emits', async () => {
    const subscribeSpy = jasmine.createSpy('subscribe');

    await render(FundListComponent, {
      componentProperties: {
        funds: [funds[0]],
        subscribe: { emit: subscribeSpy } as any,
      },
    });

    const button = screen.getByRole('button', {
      name: /suscribirme/i,
    });

    fireEvent.click(button);

    expect(subscribeSpy).toHaveBeenCalledWith(funds[0]);
  });
});
