import { Avaliacao } from "./avaliacao.model";

export class Campo {
  //Dados do campo
  id: string;
  numeroCampo: string;
  cooperadoNome: string;
  safra: string;
  especie: string;
  categoria: string;
  numeroGlebas: string;
  latitude: string;
  longitude: string;
  propriedadeNome: string;

  //criar uma entidade
  municipio: string;
  uf: string;

  cultivar: string;
  area: string;
  dataPlantio: string;
  producaoEstimada: string;

  dataColheita: string;
  umidade: string;
  producaoBruta: string;
  situacao: string; //aprovado ou reprovado ou pendente
  LinkImagens: string;
  observacoes: string;

  //conjunto de avaliações que um campo possui
  avaliacaoEmergencia?: Avaliacao;
  avaliacaoFlorecimento?: Avaliacao;
  avaliacaoPreColheita?: Avaliacao;

  public toJSON(): any {
    return {
      numeroCampo: this.numeroCampo,
      cooperadoNome: this.cooperadoNome,
      safra: this.safra,
      especie: this.especie,
      categoria: this.categoria,
      numeroGlebas: this.numeroGlebas,
      latitude: this.latitude,
      longitude: this.longitude,
      propriedadeNome: this.propriedadeNome,
      municipio: this.municipio,
      uf: this.uf,
      cultivar: this.cultivar,
      area: this.area,
      dataPlantio: this.dataPlantio,
      producaoEstimada: this.producaoEstimada,
      dataColheita: this.dataColheita,
      umidade: this.umidade,
      producaoBruta: this.producaoBruta,
      situacao: this.situacao,
      LinkImagens: this.LinkImagens,
      observacoes: this.observacoes,
      avaliacaoEmergencia: this.avaliacaoEmergencia ? this.avaliacaoEmergencia.toJSON() : {},
      avaliacaoFlorecimento: this.avaliacaoFlorecimento ? this.avaliacaoFlorecimento.toJSON() : {},
      avaliacaoPreColheita: this.avaliacaoPreColheita ? this.avaliacaoPreColheita.toJSON() : {},
    };
  }
};
