/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ContactosService } from '../servicios/contactos.service';
import { ImageService } from '../servicios/image.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };


    constructor(private sContactos: ContactosService,
                private alertController: AlertController,
                public actionSheetController: ActionSheetController,
                private sImagenes: ImageService) {}

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

  borrarImagen(id) {
    this.sImagenes.borrarImagen(id);
  }

}
