import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AccountStoreService } from '../../../core/state/account-store.service';
import { Account } from '../../../core/domain/models/account.model';
import { CurrencyCopPipe } from '../../pipes/currency-cop.pipe';

@Component({
  selector: 'app-balance-badge',
  standalone: true,
  imports: [CommonModule, CurrencyCopPipe],
  templateUrl: './balance-badge.component.html',
  styleUrl: './balance-badge.component.scss',
})
export class BalanceBadgeComponent implements OnInit {
  account$: Observable<Account | null>;

  constructor(private accountStore: AccountStoreService) {
    this.account$ = this.accountStore.account$;
  }

  ngOnInit(): void {
    this.accountStore.loadAccount();
  }
}
