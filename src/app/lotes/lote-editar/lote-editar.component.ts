import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CampoService } from 'src/app/campos/service/campo.service';
import { Observable } from 'rxjs';
import { Campo } from 'src/app/campos/models/campo.model';
import { Lote } from '../models/lote.model';
import { LoteService } from '../service/lote.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lote-editar',
  templateUrl: './lote-editar.component.html',
  styleUrls: ['./lote-editar.component.scss']
})

export class LoteEditarComponent implements OnInit {
  public lote: Lote;
  public form: FormGroup;
  public loteId: string;
  public campos$: Observable<Campo[]>;

  constructor(private campoService: CampoService,
    private loteService: LoteService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      numeroLote: ['', [Validators.required, Validators.minLength(1)]],
      situacao: ['', [Validators.required]],
      laudos: [''],
      imagens: [''],
      campos: [[], [Validators.required]],
      categoria: [[], [Validators.required]],
      safra: [[], [Validators.required]],
    });

    this.campos$ = this.campoService.selecionarTodos();
    this.loteId = this.route.snapshot.paramMap.get('id')!;
    this.loteService.selecionarPorId(this.loteId).subscribe((lote: Lote | undefined) => {
      if (lote) {
        this.lote = lote;

        this.form.patchValue({
          numeroLote: lote.numeroLote,
          situacao: lote.situacao,
          laudos: lote.laudos,
          campos: this.campos$,
        });
      }
    });
  }

  public async gravar() {
    try {
      if (this.form.valid) {
      const camposSelecionados = this.form.value.campos;

      const numeroLote = this.form.value.numeroLote;
      const idsDosCampos = camposSelecionados.map((campo: any) => campo.id);
      const laudos = this.form.value.laudos;
      const imagens = this.form.value.imagens;
      const numerosDosCampos = camposSelecionados.map((campo: any) => campo.numeroCampo);
      const situacao = this.form.value.situacao;
      const categoria = this.form.value.categoria;
      const safra = this.form.value.safra;

      const loteObj = new Lote();
      loteObj.numeroLote = numeroLote;
      loteObj.camposIds = idsDosCampos;
      loteObj.camposNumeros = numerosDosCampos;
      loteObj.situacao = situacao;
      loteObj.categoria = categoria;
      loteObj.safra = safra;
      loteObj.laudos = laudos;
      loteObj.imagens = imagens;

      const loteData = loteObj.toJSON();
      loteData.id = this.lote.id;

      await this.loteService.editar(loteData);

      this.toastrService.success('Lote atualizado com sucesso', 'Atualização de Lotes');
      this.router.navigate(['/lotes/listar']);
      }
      if (this.form.invalid)
        this.toastrService.error('Por favor, preencha todos os campos obrigatórios', 'Edição de Lote');
    } catch (error) {
      this.toastrService.error('Lote não atualizado');
    }
  }

  public voltar() {
    this.router.navigate(['/lotes/listar']);
  }
}
