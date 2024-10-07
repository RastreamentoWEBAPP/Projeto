export class Lote {
  id: string;
  numeroLote: string;
  camposIds: string[];
  camposNumeros: string[];
  situacao: string;
  laudos: string;

  toJSON(): any {
    return {
      numeroLote: this.numeroLote,
      camposIds: this.camposIds,
      camposNumeros: this.camposNumeros,
      situacao: this.situacao,
      laudos: this.laudos
    };
  }
}
