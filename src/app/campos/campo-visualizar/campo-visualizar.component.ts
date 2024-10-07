import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Campo } from '../models/campo.model';
import { CampoService } from '../service/campo.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-campo-visualizar',
  templateUrl: './campo-visualizar.component.html',
  styleUrls: ['./campo-visualizar.component.scss']
})
export class VisualizarCampoComponent implements OnInit {
  public campo: Campo | undefined;
  public panelOpenState = false;

  constructor(
    private location: Location,
    private campoService: CampoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const campoId = this.route.snapshot.paramMap.get('id');
    if (campoId) {
      this.campoService.selecionarPorId(campoId).subscribe((campo: Campo | undefined) => {
        this.campo = campo;
      });
    }
  }

  public calcularCiclo(dataColheitaString: string | undefined, dataPlantioString: string | undefined): string {
    if(dataPlantioString == undefined || dataColheitaString == undefined || dataColheitaString == "" || dataPlantioString == "")
      return "";

    const dataPlantio = new Date(dataPlantioString);
    const dataColheita = new Date(dataColheitaString);

    // Calcula a diferença em milissegundos
    const diffInMilliseconds = dataColheita.getTime() - dataPlantio.getTime();

    // Converte a diferença para dias
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    return diffInDays.toString();
  }

  public calcularProdutividade(producaoBruta: string | undefined, area: string | undefined): string {
    if(producaoBruta == "" || area == "")
      return "";

    // Converte a diferença para dias
    var produtividade = Number(producaoBruta)/Number(area);

    return produtividade.toString();
  }

  public formatarData(dataString: string | undefined): string {
    if(dataString == undefined || dataString == "")
      return "";

    const data = new Date(dataString);
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Os meses em JavaScript são baseados em zero, então adicionamos 1
    const ano = data.getFullYear();

    // Formate o dia e o mês para sempre terem dois dígitos
    const diaFormatado = dia < 10 ? '0' + dia : dia.toString();
    const mesFormatado = mes < 10 ? '0' + mes : mes.toString();

    return `${diaFormatado}/${mesFormatado}/${ano}`;
  }

  public voltar() {
    this.location.back();
  }
}
