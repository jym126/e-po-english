import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Lista } from 'src/app/modelos/lista';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  constructor(private http: HttpClient) { }

  uri = environment.uriList;

  listas(){
    return this.http.get(`${this.uri}/all`);
  }

  crearLista(lista: Lista) {
  }

  actualizarLista(id: number) {

  }

  borrarLista(id: Number) {

  }
}
