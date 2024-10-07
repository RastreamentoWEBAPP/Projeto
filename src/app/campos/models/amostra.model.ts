export class Amostra {
  especieDaninha: string;
  area: number = 1.5;
  numeroIndividuosPorEspecie: number; //NIE
  numeroAmostrasComAEspecie: number; //NAE
  numeroTotalDeAmostras: number = 6; //NTA
  Densidade: number = 0;
  Frequencia: number = 0;
  Abundancia: number = 0;
  DensidadeRelativa: number = 0;
  FrequenciaRelativa: number = 0;
  AbundanciaRelativa: number = 0;
  IndiceValorImportancia: number = 0; //IVI

  public toJSON(): any {
    return {
      especieDaninha: this.especieDaninha,
      area: this.area,
      numeroIndividuosPorEspecie: this.numeroIndividuosPorEspecie,
      numeroAmostrasComAEspecie: this.numeroAmostrasComAEspecie,
      numeroTotalDeAmostras: this.numeroTotalDeAmostras,
      Densidade: this.Densidade,
      Frequencia: this.Frequencia,
      Abundancia: this.Abundancia,
      DensidadeRelativa: this.DensidadeRelativa,
      FrequenciaRelativa: this.FrequenciaRelativa,
      AbundanciaRelativa: this.AbundanciaRelativa,
      IndiceValorImportancia: this.IndiceValorImportancia,
    };
  }

  public Preenehcer(especieDaninha: string, numeroIndividuosPorEspecie: number, numeroAmostrasComAEspecie: number) {
    this.especieDaninha = especieDaninha;
    this.numeroIndividuosPorEspecie = numeroIndividuosPorEspecie;
    this.numeroAmostrasComAEspecie = numeroAmostrasComAEspecie;
  }

  public CalcularValores() {
    this.Densidade = parseFloat((this.numeroIndividuosPorEspecie / this.area).toFixed(2));
    this.Frequencia = parseFloat((this.numeroAmostrasComAEspecie / this.numeroTotalDeAmostras).toFixed(2));
    if(this.numeroAmostrasComAEspecie != 0)
      this.Abundancia = parseFloat((this.numeroIndividuosPorEspecie / this.numeroAmostrasComAEspecie).toFixed(2));
  }

  public CalcularValoresRelativos(densidadeTotal: number, frequenciaTotal: number, abundanciaTotal: number){
    if(densidadeTotal != 0)
      this.DensidadeRelativa = parseFloat(((this.Densidade / densidadeTotal) * 100).toFixed(2));
    if(frequenciaTotal != 0)
      this.FrequenciaRelativa = parseFloat(((this.Frequencia / frequenciaTotal) * 100).toFixed(2));
    if(abundanciaTotal != 0)
      this.AbundanciaRelativa = parseFloat(((this.Abundancia / abundanciaTotal) * 100).toFixed(2));

    this.IndiceValorImportancia = this.DensidadeRelativa + this.FrequenciaRelativa + this.AbundanciaRelativa;
  }

  public CalcularValoresPublico() {
    this.Densidade = parseFloat((this.numeroIndividuosPorEspecie / this.area).toFixed(2));
    this.Frequencia = parseFloat((this.numeroAmostrasComAEspecie / this.numeroTotalDeAmostras).toFixed(2));
    if(this.numeroAmostrasComAEspecie != 0)
      this.Abundancia = parseFloat((this.numeroIndividuosPorEspecie / this.numeroAmostrasComAEspecie).toFixed(2));
  }
}
