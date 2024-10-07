import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InserirCampoComponent } from './campo-inserir/campo-inserir.component';
import { ListarCamposComponent } from './campo-listar/campo-listar.component';
import { VisualizarCampoComponent } from './campo-visualizar/campo-visualizar.component';
import { EditarCampoComponent } from './campo-editar/campo-editar.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { VisualizarCampoPublicoComponent } from './campo-visualizar-publico/campo-visualizar-publico.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarCamposComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inserir',
    component: InserirCampoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editar/:id',
    component: EditarCampoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'visualizar-privado/:id',
    component: VisualizarCampoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'visualizar/:id',
    component: VisualizarCampoPublicoComponent,
    canActivate: [],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampoRoutingModule { }
