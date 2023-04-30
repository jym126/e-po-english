import { Component, OnInit } from '@angular/core';
import { ListaService } from 'src/app/servicios/lista.service';
import { Lista } from 'src/app/modelos/lista';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-lista',
  templateUrl: './crear-lista.page.html',
  styleUrls: ['./crear-lista.page.scss'],
})
export class CrearListaPage implements OnInit {

  lista: Lista = {nombre: '', descripcion: '', cantidad: 1, unidad: 'Ud'};

  constructor(private listaService: ListaService,
              private router: Router) { }

  ngOnInit() {
  }

  crearLista() {
    this.listaService.crearLista(this.lista)
    this.router.navigate(['tabs/tab5']);
  }
}
