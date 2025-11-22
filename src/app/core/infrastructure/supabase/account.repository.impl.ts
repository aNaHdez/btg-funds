import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SupabaseClientService } from './supabase-client.service';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { Account } from '../../domain/models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountRepositoryImpl extends AccountRepository {
  private readonly accountId = environment.demoAccountId;

  constructor(private supabase: SupabaseClientService) {
    super();
  }

  getAccount(): Observable<Account> {
    return from(
      this.supabase.client
        .from('accounts')
        .select('*')
        .eq('id', this.accountId)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return {
          id: data.id,
          name: data.name,
          balance: Number(data.balance),
        } as Account;
      })
    );
  }

  updateBalance(newBalance: number): Observable<Account> {
    return from(
      this.supabase.client
        .from('accounts')
        .update({ balance: newBalance })
        .eq('id', this.accountId)
        .select('*')
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return {
          id: data.id,
          name: data.name,
          balance: Number(data.balance),
        } as Account;
      })
    );
  }
}
