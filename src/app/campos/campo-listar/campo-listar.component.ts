import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map, of, switchMap } from 'rxjs';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { Campo } from '../models/campo.model';
import { CampoService } from '../service/campo.service';
import { LoteService } from '../../lotes/service/lote.service';
import { CampoLocalStorageService } from '../service/campo-local-storage.service';

@Component({
  selector: 'app-campo-listar',
  templateUrl: './campo-listar.component.html',
  styleUrls: ['./campo-listar.component.scss']
})
export class ListarCamposComponent implements OnInit {
  displayedColumns: string[] = ['numeroCampo', 'cooperadoNome', 'status', 'safra', 'acoes'];
  dataSource: MatTableDataSource<Campo>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public Campos$: Observable<Campo[]>;
  private camposOriginais: Campo[] = [];
  private campoToExclude: Campo;
  public filtro = { numeroCampo: '', safra: '', cooperadoNome: '', situacao: '' };

  constructor(
    private toastrService: ToastrService,
    private campoLocalStorageService: CampoLocalStorageService,
    private campoService: CampoService,
    private loteService: LoteService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.carregarFiltrosSalvos();

    this.Campos$ = this.campoService.selecionarTodos();
    this.Campos$.subscribe(campos => {
      this.camposOriginais = campos;
      this.dataSource = new MatTableDataSource<Campo>(campos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.aplicarFiltro();
    });
  }

  abrirModalFiltro(modal: TemplateRef<any>) {
    this.modalService.open(modal, { size: 'lg' });
  }

  aplicarFiltro(): void {
    this.campoLocalStorageService.salvarFiltros(this.filtro);

    this.dataSource.data = this.camposOriginais.filter(campo => {
      return (
        (this.filtro.numeroCampo ? campo.numeroCampo.includes(this.filtro.numeroCampo) : true) &&
        (this.filtro.cooperadoNome ? campo.cooperadoNome.toLowerCase().includes(this.filtro.cooperadoNome.toLowerCase()) : true) &&
        (this.filtro.situacao ? campo.situacao === this.filtro.situacao : true) &&
        (this.filtro.safra ? campo.safra.includes(this.filtro.safra) : true)
      );
    });
  }

  public confirmarExclusao(modal: TemplateRef<any>, campo?: Campo) {
    if (campo)
      this.campoToExclude = campo;

    try {
      this.modalService.open(modal).result;
    } catch (error) {
      this.toastrService.error('Campo não excluído', 'Exclusão de Campos');
    }
  }

  public executarExclusaoConfirmada(modal: any): void {
    modal.close(true);
    this.excluir(this.campoToExclude.id);
  }

  private excluir(campoId: string) {
    let lotes$ = this.loteService.selecionarTodos();
    lotes$.pipe(
      map(lotes => lotes.some(lote => lote.camposIds.includes(campoId))),
      switchMap(campoIdPresente => {
        if (!campoIdPresente) {
          this.toastrService.success('Campo excluído com sucesso', 'Exclusão de Campos');
          return this.campoService.excluir(campoId);
        } else {
          this.toastrService.error('O campo não pode ser excluído porque está associado a um ou mais lotes.', 'Erro ao Excluir Campo');
        }

        return of(null);
      })
    ).subscribe();
  }

  resetarFiltro(): void {
    this.filtro = { numeroCampo: '', safra: '', cooperadoNome: '', situacao: '' };
    this.campoLocalStorageService.limparFiltros();
    this.aplicarFiltro();
  }

  private carregarFiltrosSalvos(): void {
    const filtrosSalvos = this.campoLocalStorageService.obterFiltros();
    if (filtrosSalvos) {
      this.filtro = filtrosSalvos;
    }
  }
}
