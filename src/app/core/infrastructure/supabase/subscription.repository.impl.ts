import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SupabaseClientService } from './supabase-client.service';
import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';
import { Subscription } from '../../domain/models/subscription.model';

@Injectable({ providedIn: 'root' })
export class SubscriptionRepositoryImpl extends SubscriptionRepository {
  private readonly accountId = environment.demoAccountId;

  constructor(private supabase: SupabaseClientService) {
    super();
  }

  getSubscriptions(): Observable<Subscription[]> {
    return from(
      this.supabase.client
        .from('subscriptions')
        .select(
          `
          id,
          fund_id,
          amount,
          created_at,
          funds:funds (
            name,
            category
          )
        `
        )
        .eq('account_id', this.accountId)
        .order('created_at', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []).map((row: any) => {
          return {
            id: row.id,
            fundId: row.fund_id,
            fundName: row.funds?.name,
            category: row.funds?.category,
            amount: Number(row.amount),
            createdAt: row.created_at,
          } as Subscription;
        });
      })
    );
  }

  create(fundId: number, amount: number): Observable<void> {
    return from(
      this.supabase.client.from('subscriptions').insert({
        account_id: this.accountId,
        fund_id: fundId,
        amount,
      })
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
      })
    );
  }

  deleteSubscription(id: string): Observable<void> {
    return from(
      this.supabase.client.from('subscriptions').delete().eq('id', id)
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
      })
    );
  }
}
