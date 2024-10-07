export class Lote {
  id: string;
  numeroLote: string;
  camposIds: string[];
  camposNumeros: string[];
  situacao: string;
  categoria: string;
  safra: string;
  laudos: string;
  imagens: string;

  toJSON(): any {
    return {
      numeroLote: this.numeroLote,
      camposIds: this.camposIds,
      camposNumeros: this.camposNumeros,
      situacao: this.situacao,
      categoria: this.categoria,
      safra: this.safra,
      imagens: this.imagens,
      laudos: this.laudos
    };
  }
}
