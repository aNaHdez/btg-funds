import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { Fund } from '../../../../core/domain/models/fund.model';
import { CurrencyCopPipe } from '../../../../shared/pipes/currency-cop.pipe';

@Component({
  selector: 'app-fund-subscribe-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    InputNumberModule,
    ButtonModule,
    CurrencyCopPipe,
  ],
  templateUrl: './fund-subscribe-dialog.component.html',
  styleUrl: './fund-subscribe-dialog.component.scss',
})
export class FundSubscribeDialogComponent {
  @Input() visible = false;
  @Input() fund: Fund | null = null;
  @Input() loading = false;

  @Output() confirm = new EventEmitter<number>();
  @Output() close = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0)]],
    });
  }

  get amountControl() {
    return this.form.get('amount');
  }

  onHide(): void {
    this.close.emit();
    this.form.reset();
  }

  onConfirm(): void {
    if (this.loading) return;

    if (this.form.invalid || !this.fund) {
      this.form.markAllAsTouched();
      return;
    }

    const amount = this.form.value.amount;
    this.confirm.emit(amount);
  }
}
