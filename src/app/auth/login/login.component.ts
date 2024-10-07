import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public formRecuperacao: FormGroup;

  constructor
    (private formBuilder: FormBuilder
    ,private authService: AuthenticationService
    ,private router: Router
    ,private modalService: NgbModal
    ,private toastrService: ToastrService)
  {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(""),
      senha: new FormControl("")
    });

    this.formRecuperacao = this.formBuilder.group({
      emailRecuperacao: new FormControl("")
    })
  }

  get email(): AbstractControl | null{
    return this.form.get("email");
  }

  get senha(): AbstractControl | null{
    return this.form.get("senha");
  }

  get emailRecuperacao(): AbstractControl | null {
    return this.formRecuperacao.get("emailRecuperacao");
  }

  public async login(){
    const email = this.email?.value;
    const senha = this.senha?.value;

    try{
      const resposta = await this.authService.login(email, senha);

      if(resposta?.user){
        this.router.navigate(["/painel"])
      }
      this.toastrService.success("Usuário logado com Sucesso")
    }catch(error){
      this.toastrService.error("Erro ao efetuar o Login")
    }
  }

  public abrirModalRecuperacao(modal: TemplateRef<any>) {
    this.modalService.open(modal)
      .result
      .then(resultado =>{
        if(resultado == "enviar"){
          this.authService.resetarSenha(this.emailRecuperacao?.value)
        }
      })
      .catch(() =>{
        this.formRecuperacao.get("emailRecuperacao")?.reset;
      });
  }

}
