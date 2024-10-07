import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/services/auth.guard';
import { LoginGuard } from './auth/services/login.guard';
import { PainelComponent } from './painel/painel.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "painel",
    component: PainelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "campos", loadChildren: ()=> import("./campos/campo.module")
    .then(m => m.CampoModule)
  },
  {
    path: "lotes", loadChildren: ()=> import("./lotes/lote.module")
    .then(m => m.LoteModule)
  },
  {
    path: "usuarios", loadChildren: ()=> import("./usuarios/usuario.module")
    .then(m => m.UsuarioModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
