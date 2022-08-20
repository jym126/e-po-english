/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Contactos } from '../modelos/contactos';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  contacto: Contactos[] = [];
  private _storage: Storage | null = null;


  private url: string = environment.url;


  constructor(private storage: Storage,
              private http: HttpClient,
              private router: Router) {
    this.init();
  }

  get getLocalContactos() {
    return [...this.contacto];
   }

  getContactos(): Observable<Contactos[]> {
    return this.http.get<Contactos[]>(`${this.url}`);
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.listaContactos();
  }

  guardarContacto(c: Contactos) {
    if(c.id === undefined) {
      const maxId = this.contacto.reduce((max, c) => c.id > max? c.id : max, -1);
      const newContacto = {id: maxId + 1, nombre: c.nombre, apellidos: c.apellidos, telefono: c.telefono, direccion: c.direccion, email: c.email, imagen: c.imagen};
      this.contacto.push(newContacto);
    }else{
      this.borrarContacto(c.id);
      this.contacto.push(c);
      this.contacto.sort((c1, c2) => c1.id < c2.id ? -1 : 1);
    }
    this._storage.set('contactos', this.contacto);
    this.router.navigateByUrl('tabs/tab3');
    return this.contacto;
  }

  async listaContactos() {
    const notas = await this._storage.get('contactos');
    this.contacto = notas || [];
    return this.contacto;
  }


  public borrarContacto(id: number) {
    this.contacto = this.contacto.filter(c => c.id !== id);
    return this._storage.set('contactos', this.contacto);
}
}
