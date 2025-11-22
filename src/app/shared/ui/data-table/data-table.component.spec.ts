import { render, screen } from '@testing-library/angular';
import { DataTableComponent } from './data-table.component';

interface Row {
  name: string;
}

describe('DataTableComponent (ATL)', () => {
  it('should render header and rows with projected templates', async () => {
    const rows: Row[] = [
      { name: 'Fila 1' },
      { name: 'Fila 2' },
    ];

    await render(
      `
      <app-data-table [value]="rows" [paginator]="false">
        <ng-template #tableHeader>
          <tr>
            <th>Nombre</th>
          </tr>
        </ng-template>

        <ng-template #tableBody let-row>
          <tr>
            <td>{{ row.name }}</td>
          </tr>
        </ng-template>
      </app-data-table>
      `,
      {
        imports: [DataTableComponent],
        componentProperties: { rows },
      }
    );

    expect(screen.getByText('Nombre')).toBeTruthy();
    expect(screen.getByText('Fila 1')).toBeTruthy();
    expect(screen.getByText('Fila 2')).toBeTruthy();
  });
});
