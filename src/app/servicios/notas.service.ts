/* eslint-disable eol-last */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @angular-eslint/contextual-lifecycle */
/* eslint-disable @typescript-eslint/no-shadow */
import { Injectable } from '@angular/core';
import { Notas } from '../modelos/notas';
import { Storage } from '@ionic/storage-angular';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  nota: Notas[] = [];

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  get getLocalNotas() {
    return [...this.nota];
   }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.listaNotas();
  }

  guardarNota(t: Notas) {
    if(t.id === undefined) {
      const maxId = this.nota.reduce((max, t) => t.id > max? t.id : max, -1);
      const newNote = {id: maxId + 1, titulo: t.titulo, descripcion: t.descripcion};
      this.nota.push(newNote);
    }else{
      this.borrarNota(t.id);
      this.nota.push(t);
      this.nota.sort((t1, t2) => t1.id < t2.id ? -1 : 1);
    }
    this._storage.set('notas', this.nota);
    return this.nota;
  }

  async listaNotas() {
    const notas = await this._storage.get('notas');
    this.nota = notas || [];
    return this.nota;
  }


  public borrarNota(id: number) {
    this.nota = this.nota.filter(t => t.id !== id);
    return this._storage.set('notas', this.nota);
}
}
