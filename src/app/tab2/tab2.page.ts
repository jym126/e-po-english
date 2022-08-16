import { Component } from '@angular/core';
import { Notas } from '../modelos/notas';
import { NotasService } from '../servicios/notas.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  nota: Notas = {titulo: '', descripcion: ''};

  constructor(private sNotas: NotasService,
              private alertController: AlertController,
              private sNota: NotasService) {}

  get notasAlmacenadas() {
    return this.sNotas.getLocalNotas;
  }

  guardarNota() {
    this.sNotas.guardarNota(this.nota);
    this.nota.titulo = this.nota.descripcion = '';
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
