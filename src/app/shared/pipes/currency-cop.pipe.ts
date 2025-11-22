import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCop',
  standalone: true,
})
export class CurrencyCopPipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    withSymbol: boolean = true
  ): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const num = typeof value === 'string' ? Number(value) : value;

    const formatted = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);

    return withSymbol ? formatted : formatted.replace(/[^\d.,]/g, '').trim();
  }
}
