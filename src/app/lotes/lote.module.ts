import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoteEditarComponent } from './lote-editar/lote-editar.component';
import { LoteVisualizarComponent } from './lote-visualizar/lote-visualizar.component';
import { LoteListarComponent } from './lote-listar/lote-listar.component';
import { LoteInserirComponent } from './lote-inserir/lote-inserir.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { LoteRoutingModule } from './lote-routing.module';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { LoteVisualizarPublicoComponent } from './lote-visualizar-publico/lote-visualizar-publico.component';
import { QrCodeModalComponent } from './qr-code-modal/qr-code-modal.component';


@NgModule({
  declarations: [
    LoteListarComponent,
    LoteInserirComponent,
    LoteEditarComponent,
    LoteVisualizarComponent,
    LoteVisualizarPublicoComponent,
    QrCodeModalComponent
  ],
  imports: [
    AngularFireStorageModule,
    CommonModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule,
    LoteRoutingModule,
    NgxMaskModule.forChild()
  ]
})
export class LoteModule { }
