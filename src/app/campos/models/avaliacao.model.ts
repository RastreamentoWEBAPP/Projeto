import { Amostra } from "./amostra.model";

//Cada avaliação é composta atualmente por um número fixo de amostras a serem análisadas
//Atualmente são levadas em consideração 6 amostras.
export class Avaliacao {
  amostra1: Amostra;
  amostra2: Amostra;
  amostra3: Amostra;
  amostra4: Amostra;
  amostra5: Amostra;
  amostra6: Amostra;
  densidadeTotal: number = 0;
  frequenciaTotal: number = 0;
  abundanciaTotal: number = 0;

  observacoes: string;
  conclusoes: string;

  constructor() {
    this.amostra1 = new Amostra();
    this.amostra2 = new Amostra();
    this.amostra3 = new Amostra();
    this.amostra4 = new Amostra();
    this.amostra5 = new Amostra();
    this.amostra6 = new Amostra();
  }

  public CalularResulados() {
    this.amostra1.CalcularValores();
    this.amostra2.CalcularValores();
    this.amostra3.CalcularValores();
    this.amostra4.CalcularValores();
    this.amostra5.CalcularValores();
    this.amostra6.CalcularValores();

    this.AcumularValoresTotais();

    this.amostra1.CalcularValoresRelativos(this.densidadeTotal, this.frequenciaTotal, this.abundanciaTotal);
    this.amostra2.CalcularValoresRelativos(this.densidadeTotal, this.frequenciaTotal, this.abundanciaTotal);
    this.amostra3.CalcularValoresRelativos(this.densidadeTotal, this.frequenciaTotal, this.abundanciaTotal);
    this.amostra4.CalcularValoresRelativos(this.densidadeTotal, this.frequenciaTotal, this.abundanciaTotal);
    this.amostra5.CalcularValoresRelativos(this.densidadeTotal, this.frequenciaTotal, this.abundanciaTotal);
    this.amostra6.CalcularValoresRelativos(this.densidadeTotal, this.frequenciaTotal, this.abundanciaTotal);
  }

  public toJSON(): any {
    return {
      observacoes: this.observacoes,
      conclusoes: this.conclusoes,
      amostra1: this.amostra1 ? this.amostra1.toJSON() : {},
      amostra2: this.amostra2 ? this.amostra2.toJSON() : {},
      amostra3: this.amostra3 ? this.amostra3.toJSON() : {},
      amostra4: this.amostra4 ? this.amostra4.toJSON() : {},
      amostra5: this.amostra5 ? this.amostra5.toJSON() : {},
      amostra6: this.amostra6 ? this.amostra6.toJSON() : {}
    };
  }

  private AcumularValoresTotais(){
    this.densidadeTotal = this.amostra1.Densidade +
                          this.amostra2.Densidade +
                          this.amostra3.Densidade +
                          this.amostra4.Densidade +
                          this.amostra5.Densidade +
                          this.amostra6.Densidade;

    this.frequenciaTotal = this.amostra1.Frequencia +
                           this.amostra2.Frequencia +
                           this.amostra3.Frequencia +
                           this.amostra4.Frequencia +
                           this.amostra5.Frequencia +
                           this.amostra6.Frequencia;

    this.abundanciaTotal = this.amostra1.Abundancia +
                           this.amostra2.Abundancia +
                           this.amostra3.Abundancia +
                           this.amostra4.Abundancia +
                           this.amostra5.Abundancia +
                           this.amostra6.Abundancia;
  }
}
