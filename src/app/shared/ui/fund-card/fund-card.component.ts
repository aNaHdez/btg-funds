import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Fund } from '../../../core/domain/models/fund.model';
import { CurrencyCopPipe } from "../../pipes/currency-cop.pipe";

@Component({
  selector: 'app-fund-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, CurrencyCopPipe],
  templateUrl: './fund-card.component.html',
  styleUrl: './fund-card.component.scss',
})
export class FundCardComponent {
  @Input() fund!: Fund;
  @Output() subscribe = new EventEmitter<Fund>();

  onSubscribeClick(): void {
    this.subscribe.emit(this.fund);
  }
}
