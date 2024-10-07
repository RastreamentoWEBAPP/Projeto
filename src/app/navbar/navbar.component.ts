import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AuthenticationService } from '../auth/services/authentication.service';
import { Router } from '@angular/router';
import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // @ViewChild('drawer') drawer: MatSidenav | undefined;

  public usuarioLogado: Observable<firebase.User | null>;
  public estaColapsada: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.usuarioLogado;
  }

  sair(){
    this.authService.logout()
    .then(() => this.router.navigate(['/login']))
  }
}
