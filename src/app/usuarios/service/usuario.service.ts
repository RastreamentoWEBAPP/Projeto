import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable, take } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private registros: AngularFirestoreCollection<Usuario>

  constructor(private firestore: AngularFirestore) {
    this.registros = this.firestore.collection<Usuario>("Usuarios")
  }

  public async inserir(registro: Usuario): Promise<any> {
    if(!registro)
      return Promise.reject("Item inválido");

    const res = await this.registros.add(registro);

    registro.id = res.id;

    this.registros.doc(res.id).set(registro);
  }

  public async editar(registro: Usuario): Promise<void> {
    return this.registros.doc(registro.id).set(registro);
  }

  public excluir(registro: Usuario): Promise<void> {
    return this.registros.doc(registro.id).delete();
  }

  public selecionarTodos(): Observable<Usuario[]>{
    return this.registros.valueChanges();
  }

  public selecionarUsuarioLogado(email: string): Observable<Usuario>{
    return this.firestore
      .collection<Usuario>("usuarios", ref => {
        return ref.where("email","==",email)
      })
      .valueChanges()
      .pipe(
        take(1),
        map(usuarios => usuarios[0])
      )
  }
}
