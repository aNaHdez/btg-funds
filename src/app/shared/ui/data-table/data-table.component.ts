import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent<T = any> {
  @Input() value: T[] = [];
  @Input() rows = 10;
  @Input() rowsPerPageOptions: number[] = [5, 10, 25, 50];
  @Input() paginator = true;
  @Input() responsiveLayout: 'scroll' | 'stack' = 'scroll';

  @ContentChild('tableHeader', { read: TemplateRef })
  headerTemplate?: TemplateRef<any>;

  @ContentChild('tableBody', { read: TemplateRef })
  bodyTemplate?: TemplateRef<any>;
}
