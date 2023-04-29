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

  async presentListConfirm(id: number, titulo: string) {
    const alert = await this.alertController.create({
      header: 'Borrar tarea',
      message: `¿Estás seguro que quieres borrar la tarea <strong> ${titulo}</strong>?`,
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
