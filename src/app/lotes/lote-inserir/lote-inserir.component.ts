import { Component, OnInit } from '@angular/core';
import { LoteService } from '../service/lote.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CampoService } from 'src/app/campos/service/campo.service';
import { Observable } from 'rxjs';
import { Campo } from 'src/app/campos/models/campo.model';
import { Lote } from '../models/lote.model';

@Component({
  selector: 'app-lote-inserir',
  templateUrl: './lote-inserir.component.html',
  styleUrls: ['./lote-inserir.component.scss']
})
export class LoteInserirComponent implements OnInit {
  public panelOpenState = false;
  public form: FormGroup;
  public loteToInsert: Lote = new Lote();
  public campos$!: Observable<Campo[]>;

  constructor(
    private campoService: CampoService,
    private loteService: LoteService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      numeroLote: ['', [Validators.required, Validators.minLength(1)]],
      campos: [[], [Validators.required]],
      laudos: [''],
      situacao:['Pendente', [Validators.required]],
    });

    this.campos$ = this.campoService.selecionarTodos();
  }

  public async gravar() {
    try {
      if (this.form.valid) {
        const camposSelecionados = this.form.value.campos;

        const numeroLote = this.form.value.numeroLote;
        const idsDosCampos = camposSelecionados.map((campo: any) => campo.id);
        const laudos = this.form.value.laudos;
        const numerosDosCampos = camposSelecionados.map((campo: any) => campo.numeroCampo);
        const situacao = this.form.value.situacao;

        const loteObj = new Lote();
        loteObj.numeroLote = numeroLote;
        loteObj.camposIds = idsDosCampos;
        loteObj.camposNumeros = numerosDosCampos;
        loteObj.situacao = situacao;
        loteObj.laudos = laudos

        const loteData = loteObj.toJSON();

        await this.loteService.inserir(loteData);

        this.toastrService.success('Lote inserido com sucesso', 'Cadastro de Lotes');
        this.router.navigate(['/lotes/listar']);
      }
      else
        this.toastrService.error('Por favor, preencha todos os campos obrigatórios', 'Cadastro de Lote');
    } catch (error) {
      this.toastrService.error('Lote não inserido');
    }
  }

  public voltar() {
    this.router.navigate(['/lotes/listar']);
  }
}
