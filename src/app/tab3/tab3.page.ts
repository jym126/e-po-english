import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contactos } from '../modelos/contactos';
import { ContactosService } from '../servicios/contactos.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  misContactos: Contactos[] = [];


    constructor(private sContactos: ContactosService,
                private alertController: AlertController) {}

  get contactosAlmacenados() {
    return this.sContactos.getLocalContactos;
  }
  ngOnInit() {
    // this.getContactos();
  }


  async presentAlertConfirm(id: number, nombre: string) {
    const alert = await this.alertController.create({
      header: 'Borrar tarea',
      message: `¿Estás seguro que quieres borrar el contacto <strong> ${nombre}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Aceptar',
          handler: () => {
            this.sContactos.borrarContacto(id);
          }
        }
      ]
    });

    await alert.present();
  }

}
