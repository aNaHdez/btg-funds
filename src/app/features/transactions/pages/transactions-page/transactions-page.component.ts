import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { DataTableComponent } from '../../../../shared/ui/data-table/data-table.component';
import { CurrencyCopPipe } from '../../../../shared/pipes/currency-cop.pipe';

import { Transaction } from '../../../../core/domain/models/transaction.model';
import { TransactionStoreService } from '../../../../core/state/transaction-store.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [CommonModule, TableModule, DataTableComponent, CurrencyCopPipe],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.scss',
})
export class TransactionsPageComponent implements OnInit {
  transactions$!: Observable<Transaction[]>;

  constructor(private transactionStore: TransactionStoreService) { }

  ngOnInit(): void {
    this.transactionStore.loadTransactions();
    this.transactions$ = this.transactionStore.transactions$;
  }
}
