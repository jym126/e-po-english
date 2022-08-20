/* eslint-disable eol-last */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @angular-eslint/contextual-lifecycle */
/* eslint-disable @typescript-eslint/no-shadow */
import { Injectable } from '@angular/core';
import { Tareas } from '../modelos/tareas';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  tarea: Tareas[] = [];
  checked = [];

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  get getLocalTareas() {
    return [...this.tarea];
   }

   get getChecked() {
    return[...this.checked];
   }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.listaTareas();
    this.listaChecks();
  }

  guardarTarea(t: Tareas) {
    if(t.id === undefined) {
      const maxId = this.tarea.reduce((max, t) => t.id > max? t.id : max, -1);
      const newTask = {id: maxId + 1, titulo: t.titulo, descripcion: t.descripcion};
      this.tarea.push(newTask);
    }else{
      this.borrarTarea(t.id);
      this.tarea.push(t);
      this.tarea.sort((t1, t2) => t1.id < t2.id ? -1 : 1);
    }
    this._storage.set('tareas', this.tarea);
    return this.tarea;
  }

  async listaTareas() {
    const tareas = await this._storage.get('tareas');
    this.tarea = tareas || [];
    return this.tarea;
  }

  guardarCheck(id, estado) {
    this.checked[id] = estado;
    this._storage.set('checks', this.checked);
    // console.log(this.checked);
    return this.checked;
  }

  async listaChecks() {
    const check = await this._storage.get('checks');
    this.checked = check || [];
    return this.checked;
  }


  public borrarTarea(id: number) {
    this.tarea = this.tarea.filter(t => t.id !== id);
    return this._storage.set('tareas', this.tarea);
}
}