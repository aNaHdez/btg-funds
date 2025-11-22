import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

import { Subscription } from '../../../../core/domain/models/subscription.model';
import { SubscriptionStoreService } from '../../../../core/state/subscription-store.service';
import { CancelSubscriptionUseCase } from '../../../../core/application/use-cases/cancel-subscription.usecase';
import { AccountStoreService } from '../../../../core/state/account-store.service';
import { CurrencyCopPipe } from '../../../../shared/pipes/currency-cop.pipe';
import { DataTableComponent } from '../../../../shared/ui/data-table/data-table.component';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    CurrencyCopPipe,
    TableModule,
    DataTableComponent,
  ],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class PortfolioPageComponent implements OnInit {
  subscriptions$!: Observable<Subscription[]>;
  isCancellingId: string | null = null;

  constructor(
    private subscriptionStore: SubscriptionStoreService,
    private cancelSubscriptionUseCase: CancelSubscriptionUseCase,
    private accountStore: AccountStoreService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.subscriptionStore.loadSubscriptions();
    this.subscriptions$ = this.subscriptionStore.subscriptions$;
  }

  onCancelClick(sub: Subscription): void {
    this.confirmationService.confirm({
      header: 'Cancelar suscripción',
      message: `¿Seguro que deseas cancelar tu suscripción en el fondo ${sub.fundName}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, cancelar',
      rejectLabel: 'No',
      accept: () => {
        this.isCancellingId = sub.id;

        this.cancelSubscriptionUseCase.execute(sub, 'EMAIL').subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'suscripción cancelada',
              detail: 'La cancelación se ha realizado correctamente.',
            });

            this.subscriptionStore.loadSubscriptions();
            this.accountStore.loadAccount();
            this.isCancellingId = null;
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error al cancelar',
              detail: error?.message ?? 'Ocurrió un error inesperado',
            });
            this.isCancellingId = null;
          },
        });
      },
    });
  }
}
