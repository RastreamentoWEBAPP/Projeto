import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Campo } from '../models/campo.model';
import { CampoService } from '../service/campo.service';
import { ToastrService } from 'ngx-toastr';
import { Avaliacao } from '../models/avaliacao.model';

@Component({
  selector: 'app-campo-editar',
  templateUrl: './campo-editar.component.html',
  styleUrls: ['./campo-editar.component.scss']
})

export class EditarCampoComponent implements OnInit {
  form: FormGroup;
  campo: Campo;
  campoId: string | null;
  public panelOpenState = false;

  constructor(
    private formBuilder: FormBuilder,
    private campoService: CampoService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
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
      situacao: [''],
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

    const campoId = this.route.snapshot.paramMap.get('id');
    this.campoId = campoId;

    if (campoId) {
      this.campoService.selecionarPorId(campoId).subscribe((campo: Campo | undefined) => {
        if (campo) {
          this.campo = campo;
          this.form.patchValue({
            numeroCampo: campo.numeroCampo,
            safra: campo.safra,
            especie: campo.especie,
            categoria: campo.categoria,
            numeroGlebas: campo.numeroGlebas,
            latitude: campo.latitude,
            longitude: campo.longitude,
            cooperadoNome: campo.cooperadoNome,
            propriedadeNome: campo.propriedadeNome,
            municipio: campo.municipio,
            uf: campo.uf,
            cultivar: campo.cultivar,
            area: campo.area,
            dataPlantio: new Date(campo.dataPlantio),
            producaoEstimada: campo.producaoEstimada,
            situacao: campo.situacao,
            dataColheita: campo.dataColheita ? new Date(campo.dataColheita) : "",
            umidade: campo.umidade,
            producaoBruta: campo.producaoBruta,
            LinkImagens: campo.LinkImagens,
            observacoes: campo.observacoes,

            observacoesEmergencia: campo.avaliacaoEmergencia?.observacoes,
            conclusoesEmergencia: campo.avaliacaoEmergencia?.conclusoes,
            emergenciaEspecie1: campo.avaliacaoEmergencia?.amostra1.especieDaninha,
            emergenciaIndividuos1: campo.avaliacaoEmergencia?.amostra1.numeroIndividuosPorEspecie,
            emergenciaAmostrasPorEspecie1: campo.avaliacaoEmergencia?.amostra1.numeroAmostrasComAEspecie,

            emergenciaEspecie2: campo.avaliacaoEmergencia?.amostra2.especieDaninha,
            emergenciaIndividuos2: campo.avaliacaoEmergencia?.amostra2.numeroIndividuosPorEspecie,
            emergenciaAmostrasPorEspecie2: campo.avaliacaoEmergencia?.amostra2.numeroAmostrasComAEspecie,

            emergenciaEspecie3: campo.avaliacaoEmergencia?.amostra3.especieDaninha,
            emergenciaIndividuos3: campo.avaliacaoEmergencia?.amostra3.numeroIndividuosPorEspecie,
            emergenciaAmostrasPorEspecie3: campo.avaliacaoEmergencia?.amostra3.numeroAmostrasComAEspecie,

            emergenciaEspecie4: campo.avaliacaoEmergencia?.amostra4.especieDaninha,
            emergenciaIndividuos4: campo.avaliacaoEmergencia?.amostra4.numeroIndividuosPorEspecie,
            emergenciaAmostrasPorEspecie4: campo.avaliacaoEmergencia?.amostra4.numeroAmostrasComAEspecie,

            emergenciaEspecie5: campo.avaliacaoEmergencia?.amostra5.especieDaninha,
            emergenciaIndividuos5: campo.avaliacaoEmergencia?.amostra5.numeroIndividuosPorEspecie,
            emergenciaAmostrasPorEspecie5: campo.avaliacaoEmergencia?.amostra5.numeroAmostrasComAEspecie,

            emergenciaEspecie6: campo.avaliacaoEmergencia?.amostra6.especieDaninha,
            emergenciaIndividuos6: campo.avaliacaoEmergencia?.amostra6.numeroIndividuosPorEspecie,
            emergenciaAmostrasPorEspecie6: campo.avaliacaoEmergencia?.amostra6.numeroAmostrasComAEspecie,


            observacoesFlorecimento: campo.avaliacaoFlorecimento?.observacoes,
            conclusoesFlorecimento: campo.avaliacaoFlorecimento?.conclusoes,
            florecimentoEspecie1: campo.avaliacaoFlorecimento?.amostra1.especieDaninha,
            florecimentoIndividuos1: campo.avaliacaoFlorecimento?.amostra1.numeroIndividuosPorEspecie,
            florecimentoAmostrasPorEspecie1: campo.avaliacaoFlorecimento?.amostra1.numeroAmostrasComAEspecie,

            florecimentoEspecie2: campo.avaliacaoFlorecimento?.amostra2.especieDaninha,
            florecimentoIndividuos2: campo.avaliacaoFlorecimento?.amostra2.numeroIndividuosPorEspecie,
            florecimentoAmostrasPorEspecie2: campo.avaliacaoFlorecimento?.amostra2.numeroAmostrasComAEspecie,

            florecimentoEspecie3: campo.avaliacaoFlorecimento?.amostra3.especieDaninha,
            florecimentoIndividuos3: campo.avaliacaoFlorecimento?.amostra3.numeroIndividuosPorEspecie,
            florecimentoAmostrasPorEspecie3: campo.avaliacaoFlorecimento?.amostra3.numeroAmostrasComAEspecie,

            florecimentoEspecie4: campo.avaliacaoFlorecimento?.amostra4.especieDaninha,
            florecimentoIndividuos4: campo.avaliacaoFlorecimento?.amostra4.numeroIndividuosPorEspecie,
            florecimentoAmostrasPorEspecie4: campo.avaliacaoFlorecimento?.amostra4.numeroAmostrasComAEspecie,

            florecimentoEspecie5: campo.avaliacaoFlorecimento?.amostra5.especieDaninha,
            florecimentoIndividuos5: campo.avaliacaoFlorecimento?.amostra5.numeroIndividuosPorEspecie,
            florecimentoAmostrasPorEspecie5: campo.avaliacaoFlorecimento?.amostra5.numeroAmostrasComAEspecie,

            florecimentoEspecie6: campo.avaliacaoFlorecimento?.amostra6.especieDaninha,
            florecimentoIndividuos6: campo.avaliacaoFlorecimento?.amostra6.numeroIndividuosPorEspecie,
            florecimentoAmostrasPorEspecie6: campo.avaliacaoFlorecimento?.amostra6.numeroAmostrasComAEspecie,


            observacoesPreColheita: campo.avaliacaoPreColheita?.observacoes,
            conclusoesPreColheita: campo.avaliacaoPreColheita?.conclusoes,
            preColheitaEspecie1: campo.avaliacaoPreColheita?.amostra1.especieDaninha,
            preColheitaIndividuos1: campo.avaliacaoPreColheita?.amostra1.numeroIndividuosPorEspecie,
            preColheitaAmostrasPorEspecie1: campo.avaliacaoPreColheita?.amostra1.numeroAmostrasComAEspecie,

            preColheitaEspecie2: campo.avaliacaoPreColheita?.amostra2.especieDaninha,
            preColheitaIndividuos2: campo.avaliacaoPreColheita?.amostra2.numeroIndividuosPorEspecie,
            preColheitaAmostrasPorEspecie2: campo.avaliacaoPreColheita?.amostra2.numeroAmostrasComAEspecie,

            preColheitaEspecie3: campo.avaliacaoPreColheita?.amostra3.especieDaninha,
            preColheitaIndividuos3: campo.avaliacaoPreColheita?.amostra3.numeroIndividuosPorEspecie,
            preColheitaAmostrasPorEspecie3: campo.avaliacaoPreColheita?.amostra3.numeroAmostrasComAEspecie,

            preColheitaEspecie4: campo.avaliacaoPreColheita?.amostra4.especieDaninha,
            preColheitaIndividuos4: campo.avaliacaoPreColheita?.amostra4.numeroIndividuosPorEspecie,
            preColheitaAmostrasPorEspecie4: campo.avaliacaoPreColheita?.amostra4.numeroAmostrasComAEspecie,

            preColheitaEspecie5: campo.avaliacaoPreColheita?.amostra5.especieDaninha,
            preColheitaIndividuos5: campo.avaliacaoPreColheita?.amostra5.numeroIndividuosPorEspecie,
            preColheitaAmostrasPorEspecie5: campo.avaliacaoPreColheita?.amostra5.numeroAmostrasComAEspecie,

            preColheitaEspecie6: campo.avaliacaoPreColheita?.amostra6.especieDaninha,
            preColheitaIndividuos6: campo.avaliacaoPreColheita?.amostra6.numeroIndividuosPorEspecie,
            preColheitaAmostrasPorEspecie6: campo.avaliacaoPreColheita?.amostra6.numeroAmostrasComAEspecie,
          });
        }
      });
    }
  }

  public async gravar() {
    try {
      console.log(this.campo);
      console.log(this.form);
      debugger
      if (this.campo && this.form.valid) {
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
        console.log(avaliacaoEmergencia);
        campoData.id = this.campoId;
        await this.campoService.editar(campoData);
        this.toastrService.success('Campo editado com sucesso', 'Edição de Campos');
        this.router.navigate(['/campos/listar']);
      }
      else
        this.toastrService.error('Por favor, preencha todos os campos obrigatórios', 'Edição de Campos');
    } catch (error) {
      this.toastrService.error('Campo não editado', 'Edição de Campos');
    }
  }

  public voltar() {
    this.router.navigate(['/campos/listar']);
  }
}
