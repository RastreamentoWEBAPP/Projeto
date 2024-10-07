import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Campo } from 'src/app/campos/models/campo.model';
import { CampoService } from 'src/app/campos/service/campo.service';
import { LoteService } from '../service/lote.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lote } from '../models/lote.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-lote-visualizar',
  templateUrl: './lote-visualizar.component.html',
  styleUrls: ['./lote-visualizar.component.scss']
})
export class LoteVisualizarComponent implements OnInit {
  public lote: Lote | undefined;
  public Campos$: Observable<Campo[]>;
  public panelOpenState = true;

  displayedColumns: string[] = ['numeroCampo', 'status', 'acoes'];
  dataSource: MatTableDataSource<Campo>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private campoService: CampoService,
    private loteService: LoteService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const loteId = this.route.snapshot.paramMap.get('id');

    if(loteId){
        this.loteService.selecionarPorId(loteId).subscribe((lote: Lote | undefined) => {
        if(lote) {
          this.lote = lote;
          this.Campos$ = this.campoService.selecionarPorIds(lote.camposIds);
          this.Campos$.subscribe(campos => {
            this.dataSource = new MatTableDataSource(campos);
            this.dataSource.sort = this.sort;
          });
        }
      });
    }
  }

  public voltar() {
    this.router.navigate(['/lotes/listar']);
  }

}
