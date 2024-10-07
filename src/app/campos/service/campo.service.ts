import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Campo } from '../models/campo.model';

@Injectable({
  providedIn: 'root'
})
export class CampoService {

  private registros: AngularFirestoreCollection<Campo>

  constructor(private firestore: AngularFirestore) {
    this.registros = this.firestore.collection<Campo>("Campos")
  }

  public async inserir(registro: Campo): Promise<any> {
    if(!registro)
      return Promise.reject("Item inválido");

    const res = await this.registros.add(registro);

    registro.id = res.id;

    this.registros.doc(res.id).set(registro);
  }

  public async editar(registro: Campo): Promise<void> {
    return this.registros.doc(registro.id).set(registro);
  }

  public excluir(registroId: string): Promise<void> {
    return this.registros.doc(registroId).delete();
  }

  public selecionarPorId(id: string): Observable<Campo | undefined> {
    return this.registros.doc<Campo>(id).valueChanges();
  }

  public selecionarPorIds(ids: string[]): Observable<Campo[]> {
    var campos = this.registros.valueChanges().pipe(
      map((campos: Campo[]) => campos.filter((campo: Campo) => ids.includes(campo.id)))
    );
    return campos;
  }

  public selecionarTodos(): Observable<Campo[]>{
    return this.registros.valueChanges();
  }
}
