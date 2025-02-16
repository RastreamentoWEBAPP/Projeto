import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoteLocalStorageService {
  private storageKey = 'filtroLote';

  salvarFiltros(filtros: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(filtros));
  }

  obterFiltros(): any {
    const filtros = localStorage.getItem(this.storageKey);
    return filtros ? JSON.parse(filtros) : null;
  }

  limparFiltros(): void {
    localStorage.removeItem(this.storageKey);
  }
}
