import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Lote } from '../models/lote.model';
import { LoteService } from '../service/lote.service';
import { QrCodeModalComponent } from '../qr-code-modal/qr-code-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { LoteLocalStorageService } from '../service/lote-local-storage.service';

@Component({
  selector: 'app-lote-listar',
  templateUrl: './lote-listar.component.html',
  styleUrls: ['./lote-listar.component.scss']
})

export class LoteListarComponent implements OnInit {
  displayedColumns: string[] = ['numeroLote', 'camposIds', 'status', 'safra', 'acoes'];
  public filtro = { numeroLote: '', safra: '', status: '' };
  dataSource: MatTableDataSource<Lote>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('qrcodeCanvas', { static: false }) qrcodeCanvas: ElementRef;

  public Lotes$: Observable<Lote[]>;
  private lotesOriginais: Lote[] = [];
  private loteToExclude: Lote;
  url: string;

  constructor(
    private loteService: LoteService,
    private loteLocalStorageService: LoteLocalStorageService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.carregarFiltrosSalvos();

    this.Lotes$ = this.loteService.selecionarTodos();
    this.Lotes$.subscribe(lotes => {
      this.lotesOriginais = lotes;
      this.dataSource = new MatTableDataSource<Lote>(lotes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.aplicarFiltro();
    });
  }

  private carregarLotes(): void {
    this.Lotes$ = this.loteService.selecionarTodos();
    this.Lotes$.subscribe(lotes => {
      this.lotesOriginais = lotes;
      this.dataSource = new MatTableDataSource<Lote>(lotes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  public confirmarExclusao(modal: TemplateRef<any>, lote?: Lote) {
    if (lote)
      this.loteToExclude = lote;

    try {
      this.modalService.open(modal).result;
    }
    catch (error) {
      this.toastrService.error('Lote não carregado');
    }
  }

  public executarExclusaoConfirmada(modal: any): void {
    modal.close(true);
    this.excluir(this.loteToExclude.id);
    this.toastrService.success("Lote excluído com sucesso", "Exclusão de Lotes");
  }

  private excluir(loteId: string) {
    this.loteService.excluir(loteId);
  }

  openQrCodeModal(loteId: string): void {
    const url = `${window.location.origin}/lotes/visualizar/${loteId}`;
    this.dialog.open(QrCodeModalComponent, {
      data: { url }
    });
  }

  abrirModalFiltro(modal: TemplateRef<any>) {
    this.modalService.open(modal, { size: 'lg' });
  }

  aplicarFiltro(): void {
    this.loteLocalStorageService.salvarFiltros(this.filtro);
    this.dataSource.data = this.lotesOriginais.filter(lote => {
      debugger
      return (
        (this.filtro.numeroLote ? lote.numeroLote.includes(this.filtro.numeroLote) : true) &&
        (this.filtro.safra ? lote.safra.includes(this.filtro.safra) : true) &&
        (this.filtro.status ? lote.situacao === this.filtro.status : true)
      );
    });
  }

  private carregarFiltrosSalvos(): void {
    const filtrosSalvos = this.loteLocalStorageService.obterFiltros();
    if (filtrosSalvos) {
      this.filtro = filtrosSalvos;
    }
  }

  filtrarPorStatus(status: string): void {
    this.filtro.status = status;
    this.aplicarFiltro();
  }

  resetarFiltro(): void {
    this.filtro = { numeroLote: '', safra: '', status: '' };
    this.loteLocalStorageService.limparFiltros();
    this.aplicarFiltro();
  }
}
