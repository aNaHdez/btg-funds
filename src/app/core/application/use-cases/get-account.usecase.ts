import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../../domain/models/account.model';
import { AccountRepository } from '../../domain/repositories/account.repository';

@Injectable({ providedIn: 'root' })
export class GetAccountUseCase {
  constructor(private accountRepository: AccountRepository) { }

  execute(): Observable<Account> {
    return this.accountRepository.getAccount();
  }
}
