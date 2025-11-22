import { Observable } from 'rxjs';
import { Account } from '../models/account.model';

export abstract class AccountRepository {
  abstract getAccount(): Observable<Account>;
  abstract updateBalance(newBalance: number): Observable<Account>;
}
