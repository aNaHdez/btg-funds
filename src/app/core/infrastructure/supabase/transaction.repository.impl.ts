import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SupabaseClientService } from './supabase-client.service';
import {
  TransactionRepository,
} from '../../domain/repositories/transaction.repository';
import {
  Transaction,
  NotificationMethod,
  TransactionType,
} from '../../domain/models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionRepositoryImpl extends TransactionRepository {
  private readonly accountId = environment.demoAccountId;

  constructor(private supabase: SupabaseClientService) {
    super();
  }

  getTransactions(): Observable<Transaction[]> {
    return from(
      this.supabase.client
        .from('transactions')
        .select('*, funds(name)')
        .eq('account_id', this.accountId)
        .order('created_at', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []).map((row: any) => ({
          id: row.id,
          fundId: row.fund_id,
          fundName: row.funds?.name,
          amount: Number(row.amount),
          type: row.type as TransactionType,
          notificationMethod: row.notification_method as NotificationMethod,
          createdAt: row.created_at,
        }) as Transaction);
      })
    );
  }

  create(
    input: Omit<Transaction, 'id' | 'createdAt'>
  ): Observable<Transaction> {
    return from(
      this.supabase.client
        .from('transactions')
        .insert({
          account_id: this.accountId,
          fund_id: input.fundId,
          amount: input.amount,
          type: input.type,
          notification_method: input.notificationMethod,
        })
        .select('*, funds(name)')
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return {
          id: data.id,
          fundId: data.fund_id,
          fundName: data.funds?.name,
          amount: Number(data.amount),
          type: data.type,
          notificationMethod: data.notification_method,
          createdAt: data.created_at,
        } as Transaction;
      })
    );
  }
}
