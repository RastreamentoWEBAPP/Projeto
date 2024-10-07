import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map, of, switchMap } from 'rxjs';
import { Campo } from '../models/campo.model';
import { CampoService } from '../service/campo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { LoteService } from 'src/app/lotes/service/lote.service';

@Component({
  selector: 'app-campo-listar',
  templateUrl: './campo-listar.component.html',
  styleUrls: ['./campo-listar.component.scss']
})

export class ListarCamposComponent implements OnInit {
  displayedColumns: string[] = ['numeroCampo', 'cooperadoNome', 'status','acoes'];
  dataSource: MatTableDataSource<Campo>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public Campos$: Observable<Campo[]>;
  private camposOriginais: Campo[] = [];
  private campoToExclude: Campo;

  constructor(
    private toastrService: ToastrService,
    private campoService: CampoService,
    private loteService: LoteService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.Campos$ = this.campoService.selecionarTodos();
    this.Campos$.subscribe(campos => {
      this.camposOriginais = campos;
      this.dataSource = new MatTableDataSource<Campo>(campos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  public confirmarExclusao(modal: TemplateRef<any>, campo?: Campo) {
    if (campo)
      this.campoToExclude = campo;

    try {
      this.modalService.open(modal).result;
    }
    catch (error) {
      this.toastrService.error('Campo não excluido', "Exclusão de Campos");
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
        if (!campoIdPresente){
          this.toastrService.success("Campo excluído com sucesso", "Exclusão de Campos");
          return this.campoService.excluir(campoId);
        }
        else
          this.toastrService.error("O campo não pode ser excluído porque está associado a um ou mais lotes.", "Erro ao Excluir Campo");

        return of(null);
      })
    ).subscribe();
  }

  filtrarPorStatus(status: string): void {
    if (status === 'Aprovado' || status === 'Reprovado' || status === 'Pendente') {
      const filteredLotes = this.camposOriginais.filter(campo => campo.situacao === status);
      this.dataSource.data = filteredLotes;
    }
  }

  resetarFiltro(): void {
    this.dataSource.data = this.camposOriginais;
  }
}
