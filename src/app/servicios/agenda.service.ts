/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  agenda: any[] = [];

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  get getLocalAgenda() {
    return [...this.agenda];
   }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.listaAgenda();
  }

  guardarAgenda(t: any) {
    console.log(t);
    if(t.id === '') {
      const maxId = this.agenda.reduce((max, t) => t.id > max? t.id : max, -1);
      const newTask = {id: maxId + 1, title: t.title, desc: t.desc, startTime: t.startTime, endTime: t.endTime, allDay: t.allDay, endHour: t.endHour, startHour: t.startHour};
      this.agenda.push(newTask);
    }else{
      this.borrarAgenda(t.id);
      this.agenda.push(t);
      this.agenda.sort((t1, t2) => t1.id < t2.id ? -1 : 1);
    }
    this._storage.set('agenda', this.agenda);
    return this.agenda;
  }

  async listaAgenda() {
    const agenda = await this._storage.get('agenda');
    this.agenda = agenda || [];
    return this.agenda;
  }


  public borrarAgenda(id: number) {
    this.agenda = this.agenda.filter(t => t.id !== id);
    return this._storage.set('agenda', this.agenda);
}

  public borrarTodo() {
    this.agenda = [];
    this._storage.set('agenda', this.agenda);
  }
}
