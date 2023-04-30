import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ListaService } from '../servicios/lista.service';
import { element } from 'protractor';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  listaAlmacenada: any = [];

  constructor(private alertController: AlertController,
              private listaService: ListaService) { }

  ngOnInit() {
    this.listas();
  }

  async listas() {
    this.listaService.listas()
    .subscribe(res => {
      this.listaAlmacenada.push(res);
    });
    console.log(this.listaAlmacenada);
  }

  async actualizarLista(id, cantidad, unidad, nombre, descripcion) {
    const lista = {
      cantidad: cantidad,
      unidad: unidad,
      nombre: nombre,
      descripcion: descripcion
    }
    this.listaService.actualizarLista(lista, id)
    .subscribe(res => {
      if(res['status'] == 200) {
        const alert = this.alertController.create({
          message: `Lista ${nombre} actualizada`
        });
      }
    })
  }

  async presentListConfirm(id: number, nombre: string) {
    const alert = await this.alertController.create({
      header: 'Borrar tarea',
      message: `¿Estás seguro que quieres borrar la lista <strong> ${nombre}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Aceptar',
          handler: () => {
            this.listaService.borrarLista(id);
          }
        }
      ]
    });

    await alert.present();
  }

}
