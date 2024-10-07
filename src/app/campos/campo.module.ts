import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampoRoutingModule } from './campo-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { ListarCamposComponent } from './campo-listar/campo-listar.component';
import { InserirCampoComponent } from './campo-inserir/campo-inserir.component';
import { VisualizarCampoComponent } from './campo-visualizar/campo-visualizar.component';
import { EditarCampoComponent } from './campo-editar/campo-editar.component';
import { SharedModule } from '../shared/shared.module';
import { VisualizarCampoPublicoComponent } from './campo-visualizar-publico/campo-visualizar-publico.component';
import { LatitudeLongitudeMaskDirective } from '../shared/lat-long-mask/latlongMask.directive';

@NgModule({
  declarations: [
    ListarCamposComponent,
    InserirCampoComponent,
    EditarCampoComponent,
    VisualizarCampoComponent,
    VisualizarCampoPublicoComponent,
    LatitudeLongitudeMaskDirective
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule,
    CampoRoutingModule,
  ]
})
export class CampoModule { }
