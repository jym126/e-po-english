import { Component } from '@angular/core';
import { Notas } from '../modelos/notas';
import { NotasService } from '../servicios/notas.service';
import { AlertController } from '@ionic/angular';
import { ImageService } from 'src/app/servicios/image.service';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  
  // nota: Notas;
  nota = {titulo: '', descripcion: '', imagen: ''};
  imagen = 'assets/note1.png';
  foto = false;

  constructor(private sNotas: NotasService,
              private alertController: AlertController,
              private sNota: NotasService,
              private sImagen: ImageService,
              public modalController: ModalController) {}

  get notasAlmacenadas() {
    return this.sNotas.getLocalNotas;
  }

  guardarNota() {
    this.sNotas.guardarNota(this.nota);
    console.log('mi nota: '+ JSON.stringify(this.nota));
    console.log(typeof this.nota.imagen);
    this.nota.titulo = this.nota.descripcion = '';
    this.imagen = 'assets/note1.png';
  }

  captura() {
    this.foto = true;
    this.sImagen.capturaImagen().then(imagen => {
      this.imagen = imagen;
      //guardar imagen en nota.imagen
      this.nota.imagen = imagen;});
  }

  async viewPhoto(ruta) {
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: ruta
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true
    });

    return await modal.present();
  }

  async presentAlertConfirm(id: number, titulo: string) {
    const alert = await this.alertController.create({
      header: 'Borrar tarea',
      message: `¿Estás seguro que quieres borrar la nota <strong> ${titulo}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Aceptar',
          handler: () => {
            this.sNota.borrarNota(id);
          }
        }
      ]
    });

    await alert.present();
  }

}
