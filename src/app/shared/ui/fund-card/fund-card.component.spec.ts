import { render, screen, fireEvent } from '@testing-library/angular';
import { FundCardComponent } from './fund-card.component';
import { Fund } from '../../../core/domain/models/fund.model';

describe('FundCardComponent (ATL)', () => {
  const fund: Fund = {
    id: 1,
    name: 'Fondo prueba',
    minAmount: 100000,
    category: 'FPV',
  };

  it('should render fund data', async () => {
    await render(FundCardComponent, {
      componentProperties: {
        fund,
      },
    });

    expect(screen.getByText('Fondo prueba')).toBeTruthy();
    expect(
      screen.getByText('Fondo de pensiones voluntarias')
    ).toBeTruthy();
  });

  it('should emit subscribe when button is clicked', async () => {
    const subscribeSpy = jasmine.createSpy('subscribe');

    await render(FundCardComponent, {
      componentProperties: {
        fund,
        subscribe: {
          emit: subscribeSpy,
        } as any,
      },
    });

    const button = screen.getByRole('button', {
      name: /suscribirme/i,
    });

    fireEvent.click(button);

    expect(subscribeSpy).toHaveBeenCalledWith(fund);
  });
});
