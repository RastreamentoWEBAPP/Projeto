import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CampoService } from '../service/campo.service';
import { ToastrService } from 'ngx-toastr';
import { Campo } from '../models/campo.model';
import { Avaliacao } from '../models/avaliacao.model';

@Component({
  selector: 'app-campo-inserir',
  templateUrl: './campo-inserir.component.html',
  styleUrls: ['./campo-inserir.component.scss']
})

export class InserirCampoComponent implements OnInit {
  public form: FormGroup;
  public panelOpenState = false;

  constructor(
    private campoService: CampoService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      numeroCampo: ['', [Validators.required, Validators.minLength(1)]],
      safra: ['', Validators.required],
      especie: ['', Validators.required],
      categoria: ['', Validators.required],
      numeroGlebas: [''],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      cooperadoNome: ['', Validators.required],
      propriedadeNome: [''],
      municipio: ['', Validators.required],
      uf: ['', Validators.required],
      cultivar: ['', Validators.required],
      area: ['', Validators.required],
      dataPlantio: ['', Validators.required],
      producaoEstimada: ['', Validators.required],

      situacao: ['Pendente'],
      dataColheita: [''],
      umidade: [''],
      producaoBruta: [''],
      LinkImagens: [''],
      observacoes: [''],

      observacoesEmergencia: [''],
      conclusoesEmergencia: [''],
      emergenciaEspecie1: [''],
      emergenciaIndividuos1: [0],
      emergenciaAmostrasPorEspecie1: [0],

      emergenciaEspecie2: [''],
      emergenciaIndividuos2: [0],
      emergenciaAmostrasPorEspecie2: [0],

      emergenciaEspecie3: [''],
      emergenciaIndividuos3: [0],
      emergenciaAmostrasPorEspecie3: [0],

      emergenciaEspecie4: [''],
      emergenciaIndividuos4: [0],
      emergenciaAmostrasPorEspecie4: [0],

      emergenciaEspecie5: [''],
      emergenciaIndividuos5: [0],
      emergenciaAmostrasPorEspecie5: [0],

      emergenciaEspecie6: [''],
      emergenciaIndividuos6: [0],
      emergenciaAmostrasPorEspecie6: [0],

      observacoesFlorecimento: [''],
      conclusoesFlorecimento: [''],
      florecimentoEspecie1: [''],
      florecimentoIndividuos1: [0],
      florecimentoAmostrasPorEspecie1: [0],

      florecimentoEspecie2: [''],
      florecimentoIndividuos2: [0],
      florecimentoAmostrasPorEspecie2: [0],

      florecimentoEspecie3: [''],
      florecimentoIndividuos3: [0],
      florecimentoAmostrasPorEspecie3: [0],

      florecimentoEspecie4: [''],
      florecimentoIndividuos4: [0],
      florecimentoAmostrasPorEspecie4: [0],

      florecimentoEspecie5: [''],
      florecimentoIndividuos5: [0],
      florecimentoAmostrasPorEspecie5: [0],

      florecimentoEspecie6: [''],
      florecimentoIndividuos6: [0],
      florecimentoAmostrasPorEspecie6: [0],

      observacoesPreColheita: [''],
      conclusoesPreColheita: [''],
      preColheitaEspecie1: [''],
      preColheitaIndividuos1: [0],
      preColheitaAmostrasPorEspecie1: [0],

      preColheitaEspecie2: [''],
      preColheitaIndividuos2: [0],
      preColheitaAmostrasPorEspecie2: [0],

      preColheitaEspecie3: [''],
      preColheitaIndividuos3: [0],
      preColheitaAmostrasPorEspecie3: [0],

      preColheitaEspecie4: [''],
      preColheitaIndividuos4: [0],
      preColheitaAmostrasPorEspecie4: [0],

      preColheitaEspecie5: [''],
      preColheitaIndividuos5: [0],
      preColheitaAmostrasPorEspecie5: [0],

      preColheitaEspecie6: [''],
      preColheitaIndividuos6: [0],
      preColheitaAmostrasPorEspecie6: [0],
    });

    this.panelOpenState = false;
  }

  public async gravar() {
    try {
      if (this.form.valid) {
        var infoParaInsercao = this.form.value;

        const avaliacaoEmergencia = new Avaliacao();
        avaliacaoEmergencia.observacoes = infoParaInsercao.observacoesEmergencia;
        avaliacaoEmergencia.conclusoes = infoParaInsercao.conclusoesEmergencia;
        avaliacaoEmergencia.amostra1.Preenehcer(infoParaInsercao.emergenciaEspecie1, infoParaInsercao.emergenciaIndividuos1, infoParaInsercao.emergenciaAmostrasPorEspecie1);
        avaliacaoEmergencia.amostra2.Preenehcer(infoParaInsercao.emergenciaEspecie2, infoParaInsercao.emergenciaIndividuos2, infoParaInsercao.emergenciaAmostrasPorEspecie2);
        avaliacaoEmergencia.amostra3.Preenehcer(infoParaInsercao.emergenciaEspecie3, infoParaInsercao.emergenciaIndividuos3, infoParaInsercao.emergenciaAmostrasPorEspecie3);
        avaliacaoEmergencia.amostra4.Preenehcer(infoParaInsercao.emergenciaEspecie4, infoParaInsercao.emergenciaIndividuos4, infoParaInsercao.emergenciaAmostrasPorEspecie4);
        avaliacaoEmergencia.amostra5.Preenehcer(infoParaInsercao.emergenciaEspecie5, infoParaInsercao.emergenciaIndividuos5, infoParaInsercao.emergenciaAmostrasPorEspecie5);
        avaliacaoEmergencia.amostra6.Preenehcer(infoParaInsercao.emergenciaEspecie6, infoParaInsercao.emergenciaIndividuos6, infoParaInsercao.emergenciaAmostrasPorEspecie6);
        avaliacaoEmergencia.CalularResulados();

        const avaliacaoFlorecimento = new Avaliacao();
        avaliacaoFlorecimento.observacoes = infoParaInsercao.observacoesFlorecimento;
        avaliacaoFlorecimento.conclusoes = infoParaInsercao.conclusoesFlorecimento;
        avaliacaoFlorecimento.amostra1.Preenehcer(infoParaInsercao.florecimentoEspecie1, infoParaInsercao.florecimentoIndividuos1, infoParaInsercao.florecimentoAmostrasPorEspecie1);
        avaliacaoFlorecimento.amostra2.Preenehcer(infoParaInsercao.florecimentoEspecie2, infoParaInsercao.florecimentoIndividuos2, infoParaInsercao.florecimentoAmostrasPorEspecie2);
        avaliacaoFlorecimento.amostra3.Preenehcer(infoParaInsercao.florecimentoEspecie3, infoParaInsercao.florecimentoIndividuos3, infoParaInsercao.florecimentoAmostrasPorEspecie3);
        avaliacaoFlorecimento.amostra4.Preenehcer(infoParaInsercao.florecimentoEspecie4, infoParaInsercao.florecimentoIndividuos4, infoParaInsercao.florecimentoAmostrasPorEspecie4);
        avaliacaoFlorecimento.amostra5.Preenehcer(infoParaInsercao.florecimentoEspecie5, infoParaInsercao.florecimentoIndividuos5, infoParaInsercao.florecimentoAmostrasPorEspecie5);
        avaliacaoFlorecimento.amostra6.Preenehcer(infoParaInsercao.florecimentoEspecie6, infoParaInsercao.florecimentoIndividuos6, infoParaInsercao.florecimentoAmostrasPorEspecie6);
        avaliacaoFlorecimento.CalularResulados();

        const avaliacaoPreColheita = new Avaliacao();
        avaliacaoPreColheita.observacoes = infoParaInsercao.observacoesPreColheita;
        avaliacaoPreColheita.conclusoes = infoParaInsercao.conclusoesPreColheita;
        avaliacaoPreColheita.amostra1.Preenehcer(infoParaInsercao.preColheitaEspecie1, infoParaInsercao.preColheitaIndividuos1, infoParaInsercao.preColheitaAmostrasPorEspecie1);
        avaliacaoPreColheita.amostra2.Preenehcer(infoParaInsercao.preColheitaEspecie2, infoParaInsercao.preColheitaIndividuos2, infoParaInsercao.preColheitaAmostrasPorEspecie2);
        avaliacaoPreColheita.amostra3.Preenehcer(infoParaInsercao.preColheitaEspecie3, infoParaInsercao.preColheitaIndividuos3, infoParaInsercao.preColheitaAmostrasPorEspecie3);
        avaliacaoPreColheita.amostra4.Preenehcer(infoParaInsercao.preColheitaEspecie4, infoParaInsercao.preColheitaIndividuos4, infoParaInsercao.preColheitaAmostrasPorEspecie4);
        avaliacaoPreColheita.amostra5.Preenehcer(infoParaInsercao.preColheitaEspecie5, infoParaInsercao.preColheitaIndividuos5, infoParaInsercao.preColheitaAmostrasPorEspecie5);
        avaliacaoPreColheita.amostra6.Preenehcer(infoParaInsercao.preColheitaEspecie6, infoParaInsercao.preColheitaIndividuos6, infoParaInsercao.preColheitaAmostrasPorEspecie6);
        avaliacaoPreColheita.CalularResulados();

        const campo = new Campo();
        campo.numeroCampo = infoParaInsercao.numeroCampo;
        campo.cooperadoNome = infoParaInsercao.cooperadoNome;
        campo.safra = infoParaInsercao.safra;
        campo.especie = infoParaInsercao.especie;
        campo.categoria = infoParaInsercao.categoria;
        campo.numeroGlebas = infoParaInsercao.numeroGlebas;
        campo.latitude = infoParaInsercao.latitude;
        campo.longitude = infoParaInsercao.longitude;
        campo.propriedadeNome = infoParaInsercao.propriedadeNome;
        campo.municipio = infoParaInsercao.municipio;
        campo.uf = infoParaInsercao.uf;
        campo.cultivar = infoParaInsercao.cultivar;
        campo.area = infoParaInsercao.area;
        campo.dataPlantio = infoParaInsercao.dataPlantio.toString();
        campo.producaoEstimada = infoParaInsercao.producaoEstimada;
        campo.situacao = infoParaInsercao.situacao;
        campo.dataColheita = infoParaInsercao.dataColheita.toString();
        campo.umidade = infoParaInsercao.umidade;
        campo.producaoBruta = infoParaInsercao.producaoBruta;
        campo.LinkImagens = infoParaInsercao.LinkImagens;
        campo.observacoes = infoParaInsercao.observacoes;
        campo.avaliacaoEmergencia = avaliacaoEmergencia;
        campo.avaliacaoFlorecimento = avaliacaoFlorecimento;
        campo.avaliacaoPreColheita = avaliacaoPreColheita;

        const campoData = campo.toJSON();

        await this.campoService.inserir(campoData);
        this.toastrService.success('Campo inserido com sucesso', 'Cadastro de Campos');
        this.router.navigate(['/campos/listar']);
      }
      if (this.form.invalid)
        this.toastrService.error('Por favor, preencha todos os campos obrigatórios', 'Cadastro de Campos');
    } catch (error) {
      this.toastrService.error('Campo não inserido', 'Cadastro de Campos');
    }
  }

  public voltar() {
    this.router.navigate(['/campos/listar']);
  }
}
