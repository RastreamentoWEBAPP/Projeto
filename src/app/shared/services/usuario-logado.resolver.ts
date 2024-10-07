import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Usuario } from 'src/app/usuarios/models/usuario.model';
import { UsuarioService } from 'src/app/usuarios/service/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogadoResolver implements Resolve<Usuario> {

  constructor(
    private usuarioService: UsuarioService,
    private authservice: AuthenticationService
    ){}
  resolve(): Observable<Usuario> {
    return this.authservice.usuarioLogado
      .pipe(
        switchMap(usuario => {
          return this.usuarioService.selecionarUsuarioLogado(usuario?.email!)
        }),
        take(1)
      );
  }
}
