import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rastreamento-app';

  estaCarregando: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.estaCarregando = true;
      }
      else if (event instanceof NavigationEnd ||
               event instanceof NavigationError ||
               event instanceof NavigationCancel )
      {
        this.estaCarregando = false;
      }
    });
  }
}
