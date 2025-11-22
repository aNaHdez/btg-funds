import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { NotificationMethod } from '../../domain/models/transaction.model';
import { Subscription } from '../../domain/models/subscription.model';
import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';

@Injectable({ providedIn: 'root' })
export class CancelSubscriptionUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private transactionRepository: TransactionRepository,
    private subscriptionRepository: SubscriptionRepository
  ) { }

  execute(
    subscription: Subscription,
    notificationMethod: NotificationMethod
  ): Observable<void> {
    const amount = subscription.amount;
    const fundId = subscription.fundId;

    return this.accountRepository.getAccount().pipe(
      switchMap(account => {
        if (!account) {
          throw new Error('Cuenta no encontrada');
        }

        const newBalance = account.balance + amount;

        return this.accountRepository.updateBalance(newBalance).pipe(
          switchMap(() =>
            this.transactionRepository.create({
              fundId,
              amount,
              type: 'CANCELLATION',
              notificationMethod,
            })
          ),
          switchMap(() =>
            this.subscriptionRepository.deleteSubscription(subscription.id)
          ),
          map(() => void 0)
        );
      })
    );
  }
}
