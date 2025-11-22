import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Fund } from '../../domain/models/fund.model';
import { NotificationMethod } from '../../domain/models/transaction.model';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { InsufficientBalanceError } from '../../domain/errors/insufficient-balance.error';
import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';

@Injectable({ providedIn: 'root' })
export class SubscribeFundUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private transactionRepository: TransactionRepository,
    private subscriptionRepository: SubscriptionRepository
  ) { }

  execute(
    fund: Fund,
    amount: number,
    notificationMethod: NotificationMethod
  ): Observable<void> {
    return this.accountRepository.getAccount().pipe(
      switchMap(account => {
        if (!account) {
          throw new Error('Cuenta no encontrada');
        }

        if (amount < fund.minAmount) {
          throw new Error(
            `El monto debe ser mayor o igual al mínimo (${fund.minAmount})`
          );
        }

        if (account.balance < amount) {
          throw new InsufficientBalanceError(
            'No tienes saldo suficiente para esta suscripción.'
          );
        }

        const newBalance = account.balance - amount;

        return this.accountRepository.updateBalance(newBalance).pipe(
          switchMap(() =>
            this.transactionRepository.create({
              fundId: fund.id,
              amount,
              type: 'SUBSCRIPTION',
              notificationMethod,
            })
          ),
          switchMap(() => this.subscriptionRepository.create(fund.id, amount)),
          map(() => void 0)
        );
      })
    );
  }
}
