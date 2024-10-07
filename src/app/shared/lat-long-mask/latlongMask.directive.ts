import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appLatitudeLongitudeMask]'
})

export class LatitudeLongitudeMaskDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value.toUpperCase();

    // Permitir apenas números, graus, minutos, segundos, negativos e direções
    value = value.replace(/[^0-9°'".NSWE-]/g, '');

    // Formatar a entrada
    input.value = this.formatDMS(value);
  }

  private formatDMS(value: string): string {
    const match = value.match(/(-?\d{1,3})(°\d{0,2})?('?\d{0,2})?(\.\d{0,1})?([NSWE])?/);
    if (!match) return value;

    let formatted = match[1] + (match[2] || '') + (match[3] || '') + (match[4] || '') + (match[5] || '');

    // Adicionar a direção se não estiver presente
    if (formatted.length > 0 && !/[NSWE]/.test(formatted)) {
      formatted += value.includes('-') ? 'S' : 'N'; // Presumindo N/S para latitude
    }

    return formatted;
  }
}
