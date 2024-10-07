import { NgModule,  DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { PainelComponent } from './painel/painel.component';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthenticationService } from './auth/services/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PainelComponent,
    NavbarComponent,
  ],
  imports: [
    SharedModule,
    MatProgressSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

    BrowserAnimationsModule,

    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),

    NgxMaskModule.forRoot({dropSpecialCharacters: false}),
  ],
  providers: [AuthenticationService,
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
