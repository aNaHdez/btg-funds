import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fund } from '../../domain/models/fund.model';
import { FundRepository } from '../../domain/repositories/fund.repository';

@Injectable({ providedIn: 'root' })
export class GetFundsUseCase {
  constructor(private fundRepository: FundRepository) { }

  execute(): Observable<Fund[]> {
    return this.fundRepository.getFunds();
  }
}
