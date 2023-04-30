import { Component, OnInit } from '@angular/core';
import { ListaService } from 'src/app/servicios/lista.service';
import { Lista } from 'src/app/modelos/lista';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear-lista',
  templateUrl: './crear-lista.page.html',
  styleUrls: ['./crear-lista.page.scss'],
})
export class CrearListaPage implements OnInit {

  lista: Lista = {id: "", nombre: '', descripcion: '', cantidad: 1, unidad: 'Ud'};

  constructor(private listaService: ListaService,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {
  }

  crearLista() {
    this.listaService.crearLista(this.lista)
    .subscribe(res => {
      if(res['status'] == 201) {
        const alert = this.alertController.create({
          message: `Lista ${this.lista.nombre} actualizada`
        });
      }
    })
    this.router.navigate(['tabs/tab5']);
  }

  actualizarLista() {
    this.listaService.actualizarLista(this.lista, this.lista.id)
    .subscribe(res => {
      if(res['status'] == 200) {
        const alert = this.alertController.create({
          message: `Lista ${this.lista.nombre} actualizada`
        });
      }
    })
  }
}
