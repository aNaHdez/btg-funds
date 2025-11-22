import { Observable } from 'rxjs';
import { Subscription } from '../models/subscription.model';

export abstract class SubscriptionRepository {
  abstract getSubscriptions(): Observable<Subscription[]>;
  abstract create(fundId: number, amount: number): Observable<void>;
  abstract deleteSubscription(id: string): Observable<void>;
}
