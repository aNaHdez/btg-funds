import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fund } from '../../../core/domain/models/fund.model';
import { FundCardComponent } from '../fund-card/fund-card.component';

@Component({
  selector: 'app-fund-list',
  standalone: true,
  imports: [CommonModule, FundCardComponent],
  templateUrl: './fund-list.component.html',
  styleUrl: './fund-list.component.scss',
})
export class FundListComponent {
  @Input() funds: Fund[] | null = [];
  @Output() subscribe = new EventEmitter<Fund>();

  onSubscribe(fund: Fund): void {
    this.subscribe.emit(fund);
  }
}
