import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Fund } from '../domain/models/fund.model';
import { GetFundsUseCase } from '../application/use-cases/get-funds.usecase';

@Injectable({ providedIn: 'root' })
export class FundStoreService {
  private readonly fundsSubject = new BehaviorSubject<Fund[]>([]);
  readonly funds$ = this.fundsSubject.asObservable();

  constructor(private getFundsUseCase: GetFundsUseCase) {}

  loadFunds(): void {
    this.getFundsUseCase.execute().subscribe({
      next: funds => this.fundsSubject.next(funds ?? []),
      error: err => console.error('Error cargando fondos', err),
    });
  }

  setFunds(funds: Fund[]): void {
    this.fundsSubject.next(funds ?? []);
  }

  clear(): void {
    this.fundsSubject.next([]);
  }
}
