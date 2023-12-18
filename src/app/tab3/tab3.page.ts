/* eslint-disable id-blacklist */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ContactosService } from '../servicios/contactos.service';
import { ImageService } from '../servicios/image.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  isLoading = false;
  mail: string;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };


    constructor(private sContactos: ContactosService,
                private alertController: AlertController,
                public actionSheetController: ActionSheetController,
                private sImagenes: ImageService,
                private router: Router,
                private caller: CallNumber,
                public modalController: ModalController) {}

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

  editarContacto(datos) {
    this.router.navigate(['../contactos', {data: JSON.stringify(datos)}] );
    this.sContactos.borrarContacto(datos.id);
  }

  openMail(mail){
    const mailto = 'mailto:'+mail+'+?subject=Hola&body=Hola';
    window.location.href = mailto;
    return mailto;
  }

  numberCaller(number: string) {
    this.caller.callNumber(number, true);
  }

}
