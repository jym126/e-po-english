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
    return this.http.post(`${this.uri}/addList`, lista);
  }

  actualizarLista(lista: Lista, id: Number) {
    return this.http.put(`${this.uri}/updateList/${id}`, lista);
  }

  borrarLista(id: Number) {
      return this.http.delete(`${this.uri}/deleteList/${id}`);
    }

}
