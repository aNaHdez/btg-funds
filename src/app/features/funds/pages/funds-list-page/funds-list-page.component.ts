import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { Fund } from '../../../../core/domain/models/fund.model';
import { NotificationMethod } from '../../../../core/domain/models/transaction.model';
import { SubscribeFundUseCase } from '../../../../core/application/use-cases/subscribe-fund.usecase';
import { InsufficientBalanceError } from '../../../../core/domain/errors/insufficient-balance.error';

import { FundListComponent } from '../../../../shared/ui/fund-list/fund-list.component';
import { NotificationSelectorComponent } from '../../../../shared/ui/notification-selector/notification-selector.component';
import { FundSubscribeDialogComponent } from '../../components/fund-subscribe-dialog/fund-subscribe-dialog.component';
import { FundStoreService } from '../../../../core/state/fund-store.service';
import { AccountStoreService } from '../../../../core/state/account-store.service';
import { SubscriptionStoreService } from '../../../../core/state/subscription-store.service';
import { TransactionStoreService } from '../../../../core/state/transaction-store.service';

@Component({
  selector: 'app-funds-list-page',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    FundListComponent,
    NotificationSelectorComponent,
    FundSubscribeDialogComponent,
  ],
  templateUrl: './funds-list-page.component.html',
  styleUrl: './funds-list-page.component.scss',
  providers: [MessageService],
})
export class FundsListPageComponent implements OnInit {
  funds$!: Observable<Fund[]>;
  selectedFund: Fund | null = null;
  showDialog = false;
  notificationMethod: NotificationMethod = 'EMAIL';
  dialogLoading = false;

  constructor(
    private fundStore: FundStoreService,
    private subscribeFundUseCase: SubscribeFundUseCase,
    private accountStore: AccountStoreService,
    private messageService: MessageService,
    private subscriptionStore: SubscriptionStoreService,
    private transactionStore: TransactionStoreService
  ) {}

  ngOnInit(): void {
    this.fundStore.loadFunds();
    this.funds$ = this.fundStore.funds$;
  }

  onFundSelected(fund: Fund): void {
    this.selectedFund = fund;
    this.showDialog = true;
    this.dialogLoading = false;
  }

  onDialogClose(): void {
    this.showDialog = false;
    this.selectedFund = null;
    this.dialogLoading = false;
  }

  onConfirmSubscription(amount: number): void {
    if (!this.selectedFund || this.dialogLoading) return;

    this.dialogLoading = true;

    this.subscribeFundUseCase
      .execute(this.selectedFund, amount, this.notificationMethod)
      .pipe(
        finalize(() => {
          this.dialogLoading = false;
        })
      )
      .subscribe({
        next: () => {
          this.accountStore.loadAccount();
          this.fundStore.loadFunds();
          this.subscriptionStore.loadSubscriptions();
          this.transactionStore.loadTransactions();

          this.messageService.add({
            severity: 'success',
            summary: 'Suscripción realizada',
            detail: `Te suscribiste al fondo ${this.selectedFund?.name} correctamente.`,
          });

          this.onDialogClose();
        },
        error: error => {
          if (error instanceof InsufficientBalanceError) {
            this.messageService.add({
              severity: 'error',
              summary: 'Saldo insuficiente',
              detail: error.message,
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error al suscribir',
              detail:
                error?.message ??
                'Ocurrió un error inesperado al procesar la suscripción.',
            });
          }
        },
      });
  }

  onNotificationChange(method: NotificationMethod): void {
    this.notificationMethod = method;
  }
}
