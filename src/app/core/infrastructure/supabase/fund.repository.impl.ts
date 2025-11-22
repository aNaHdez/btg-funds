import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { SupabaseClientService } from './supabase-client.service';
import { FundRepository } from '../../domain/repositories/fund.repository';
import { Fund } from '../../domain/models/fund.model';

@Injectable({ providedIn: 'root' })
export class FundRepositoryImpl extends FundRepository {
  constructor(private supabase: SupabaseClientService) {
    super();
  }

  getFunds(): Observable<Fund[]> {
    return from(
      this.supabase.client
        .from('funds')
        .select('*')
        .order('id', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []).map((row: any) => ({
          id: row.id,
          name: row.name,
          minAmount: Number(row.min_amount),
          category: row.category,
        }) as Fund);
      })
    );
  }
}
