import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from '../domain/models/account.model';
import { GetAccountUseCase } from '../application/use-cases/get-account.usecase';

@Injectable({ providedIn: 'root' })
export class AccountStoreService {
  private readonly accountSubject = new BehaviorSubject<Account | null>(null);
  readonly account$ = this.accountSubject.asObservable();

  constructor(private getAccountUseCase: GetAccountUseCase) { }

  loadAccount(): void {
    this.getAccountUseCase.execute().subscribe({
      next: account => this.accountSubject.next(account),
      error: err => console.error('Error cargando cuenta', err),
    });
  }
}
