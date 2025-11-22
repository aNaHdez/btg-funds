import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subscription } from '../domain/models/subscription.model';
import { GetSubscriptionsUseCase } from '../application/use-cases/get-subscriptions.usecase';

@Injectable({ providedIn: 'root' })
export class SubscriptionStoreService {
  private readonly subscriptionsSubject = new BehaviorSubject<Subscription[]>([]);
  readonly subscriptions$ = this.subscriptionsSubject.asObservable();

  constructor(private getSubscriptionsUseCase: GetSubscriptionsUseCase) { }

  loadSubscriptions(): void {
    this.getSubscriptionsUseCase.execute().subscribe({
      next: subs => this.subscriptionsSubject.next(subs ?? []),
      error: err => console.error('Error cargando suscripciones', err),
    });
  }

  clear(): void {
    this.subscriptionsSubject.next([]);
  }
}
