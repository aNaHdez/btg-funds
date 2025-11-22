import { render } from '@testing-library/angular';
import { NotificationSelectorComponent } from './notification-selector.component';
import { NotificationMethod } from '../../../core/domain/models/transaction.model';

describe('NotificationSelectorComponent (ATL)', () => {
  it('should render the notification options', async () => {
    const { fixture } = await render(NotificationSelectorComponent);
    const component = fixture.componentInstance;

    expect(component.options.length).toBe(2);

    expect(component.options[0]).toEqual({
      label: 'Notificar por Email',
      value: 'EMAIL' as NotificationMethod,
    });

    expect(component.options[1]).toEqual({
      label: 'Notificar por SMS',
      value: 'SMS' as NotificationMethod,
    });
  });

  it('should emit methodChange when value changes', async () => {
    const methodChangeSpy = jasmine.createSpy('methodChange');

    const { fixture } = await render(NotificationSelectorComponent, {
      componentProperties: {
        method: 'EMAIL' as NotificationMethod,
        methodChange: { emit: methodChangeSpy } as any,
      },
    });

    const component = fixture.componentInstance;

    component.onChange('SMS');

    expect(methodChangeSpy).toHaveBeenCalledWith('SMS');
  });
});
