import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../domain/models/transaction.model';
import { GetTransactionsUseCase } from '../application/use-cases/get-transactions.usecase';

@Injectable({ providedIn: 'root' })
export class TransactionStoreService {
  private readonly transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  readonly transactions$ = this.transactionsSubject.asObservable();

  constructor(private getTransactionsUseCase: GetTransactionsUseCase) { }

  loadTransactions(): void {
    this.getTransactionsUseCase.execute().subscribe({
      next: tx => this.transactionsSubject.next(tx ?? []),
      error: err => console.error('Error cargando transacciones', err),
    });
  }

  setTransactions(tx: Transaction[]): void {
    this.transactionsSubject.next(tx ?? []);
  }

  clear(): void {
    this.transactionsSubject.next([]);
  }
}
