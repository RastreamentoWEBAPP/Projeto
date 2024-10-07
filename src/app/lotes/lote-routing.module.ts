import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { LoteVisualizarComponent } from './lote-visualizar/lote-visualizar.component';
import { LoteVisualizarPublicoComponent } from './lote-visualizar-publico/lote-visualizar-publico.component';
import { LoteEditarComponent } from './lote-editar/lote-editar.component';
import { LoteInserirComponent } from './lote-inserir/lote-inserir.component';
import { LoteListarComponent } from './lote-listar/lote-listar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: LoteListarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inserir',
    component: LoteInserirComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editar/:id',
    component: LoteEditarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'visualizar-privado/:id',
    component: LoteVisualizarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'visualizar/:id',
    component: LoteVisualizarPublicoComponent,
    canActivate: [],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoteRoutingModule { }
