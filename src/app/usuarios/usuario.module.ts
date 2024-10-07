import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxMaskModule.forChild()
  ]
})
export class UsuarioModule { }
