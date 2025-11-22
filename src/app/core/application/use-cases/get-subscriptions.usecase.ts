import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from '../../domain/models/subscription.model';
import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';

@Injectable({ providedIn: 'root' })
export class GetSubscriptionsUseCase {
  constructor(private subscriptionRepository: SubscriptionRepository) { }

  execute(): Observable<Subscription[]> {
    return this.subscriptionRepository.getSubscriptions();
  }
}
