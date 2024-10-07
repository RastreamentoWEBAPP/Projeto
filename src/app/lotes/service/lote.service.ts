import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Lote } from '../models/lote.model';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  private registros: AngularFirestoreCollection<Lote>

  constructor(private firestore: AngularFirestore) {
    this.registros = this.firestore.collection<Lote>("Lotes")
  }

  public async inserir(registro: Lote): Promise<any> {
    if(!registro)
      return Promise.reject("Item inválido");

    const res = await this.registros.add(registro);

    registro.id = res.id;

    this.registros.doc(res.id).set(registro);
  }

  public async editar(registro: Lote): Promise<void> {
    if (!registro.id) {
      throw new Error("ID do registro não fornecido");
    }

    await this.registros.doc(registro.id).update(registro);
  }

  public excluir(registroId: string): Promise<void> {
    return this.registros.doc(registroId).delete();
  }

  public selecionarPorId(id: string): Observable<Lote | undefined> {
    return this.registros.doc<Lote>(id).valueChanges();
  }

  public selecionarTodos(): Observable<Lote[]>{
    return this.registros.valueChanges();
  }
}
