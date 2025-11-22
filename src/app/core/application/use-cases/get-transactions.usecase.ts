import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../domain/models/transaction.model';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

@Injectable({ providedIn: 'root' })
export class GetTransactionsUseCase {
  constructor(private transactionRepository: TransactionRepository) { }

  execute(): Observable<Transaction[]> {
    return this.transactionRepository.getTransactions();
  }
}
