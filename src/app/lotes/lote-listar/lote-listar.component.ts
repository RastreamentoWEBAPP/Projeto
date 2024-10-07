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

@Component({
  selector: 'app-lote-listar',
  templateUrl: './lote-listar.component.html',
  styleUrls: ['./lote-listar.component.scss']
})

export class LoteListarComponent implements OnInit {
  displayedColumns: string[] = ['numeroLote', 'camposIds', 'status', 'acoes'];
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
    private modalService: NgbModal,
    private toastrService: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.carregarLotes();
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

  filtrarPorStatus(status: string): void {
    if (status === 'Aprovado' || status === 'Reprovado' || status === 'Pendente') {
      const filteredLotes = this.lotesOriginais.filter(lote => lote.situacao === status);
      this.dataSource.data = filteredLotes;
    }
  }

  resetarFiltro(): void {
    this.dataSource.data = this.lotesOriginais;
  }
}
