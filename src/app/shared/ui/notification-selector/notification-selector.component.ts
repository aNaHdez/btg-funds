import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { NotificationMethod } from '../../../core/domain/models/transaction.model';

interface NotificationOption {
  label: string;
  value: NotificationMethod;
}

@Component({
  selector: 'app-notification-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule],
  templateUrl: './notification-selector.component.html',
  styleUrl: './notification-selector.component.scss',
})
export class NotificationSelectorComponent {
  @Input() method: NotificationMethod = 'EMAIL';
  @Output() methodChange = new EventEmitter<NotificationMethod>();

  options: NotificationOption[] = [
    { label: 'Notificar por Email', value: 'EMAIL' },
    { label: 'Notificar por SMS', value: 'SMS' },
  ];

  onChange(value: NotificationMethod): void {
    this.method = value;
    this.methodChange.emit(value);
  }
}
