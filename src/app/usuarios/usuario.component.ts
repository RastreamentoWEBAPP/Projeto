import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Usuario } from './models/usuario.model';
import { UsuarioService } from './service/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../auth/services/authentication.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'email', 'acoes'];
  dataSource: MatTableDataSource<Usuario>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public usuarios$: Observable<Usuario[]>
  private usuarios: Usuario[] = [];
  public form: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private usuarioService: UsuarioService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.usuarios$ = this.usuarioService.selecionarTodos();
    this.usuarios$.subscribe(usuarios => {
      this.usuarios = usuarios;
      this.dataSource = new MatTableDataSource<Usuario>(usuarios);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.form = this.fb.group({
      usuario: new FormGroup({
        id: new FormControl(""),
        nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
        email: new FormControl("", [Validators.required, Validators.email]),
        funcao: new FormControl("", [Validators.required, Validators.minLength(3)])
      }),
      senha: new FormControl("", [Validators.minLength(3)])
    });
  }

  get id() {
    return this.form.get("usuario.id");
  }

  get nome() {
    return this.form.get("usuario.nome");
  }

  get email() {
    return this.form.get("usuario.email");
  }

  get funcao() {
    return this.form.get("usuario.funcao");
  }

  get empresa() {
    return this.form.get("usuario.email");
  }

  get senha() {
    return this.form.get("senha");
  }

  public async gravar(modal: TemplateRef<any>, usuario?: Usuario) {
    this.form.reset();

    try {
      await this.modalService.open(modal).result;

      if (!usuario) {
        await this.authService.cadastrar(this.email?.value, this.senha?.value)

        await this.usuarioService.inserir(this.form.get("usuario")?.value)

        this.toastrService.success("Usuario inserido com sucesso", "Cadastro de Usuario");
      }
      else {
        await this.usuarioService.editar(this.form.get("usuario")?.value)

        this.toastrService.success("Usuario editado com sucesso", "Edição de Usuario");
      }

    } catch (error) {
      if (error != "fechar" && error != "0" && error != "1")
        this.toastrService.error('Usuario não inserido');
    }
  }

  public excluir(usuario: Usuario) {
    this.usuarioService.excluir(usuario);
  }
}
