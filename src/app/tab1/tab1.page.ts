/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Tareas } from '../modelos/tareas';
import { TareasService } from '../servicios/tareas.service';
import { AlertController, NavController } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  tareas: Tareas[] = [];
  estilo =  '';
  @ViewChild('dateTime') dateTime;

  date = new Date();
  day = String(this.date.getDate()).padStart(2, '0');
  month = String(this.date.getMonth()+1).padStart(2, '0');
  year = this.date.getFullYear();
  fullDate = `${this.year}-${this.month}-${this.day}T00:00`;



  constructor(private sTareas: TareasService,
              private alertController: AlertController,
              private sTarea: TareasService,
              public toastController: ToastController
              ) {}

  async ngOnInit() {
  }

  get tareasAlmacenadas() {
    return this.sTareas.getLocalTareas;
  }

  async presentAlertConfirm(id: number, titulo: string) {
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
            this.sTarea.borrarTarea(id);
          }
        }
      ]
    });

    await alert.present();
  }

  // Schedule delayed notification
  async notifications(date, titulo, descript) {
    let time = date.toString();
    time = time.slice(11,16);
    if(time !== '00:00'){
    await LocalNotifications.schedule({
    notifications: [{
    id: 1,
    title: titulo,
    body: descript,
    schedule: {at: new Date(date)}
    }]
    });
    this.sendToast();
    }
  }

  check(item) {
    //ternario para tachar tarea realizada
    item.isChecked ? document.getElementById(item.id).setAttribute('style','text-decoration:line-through') :
    document.getElementById(item.id).setAttribute('style','');
    }

  async sendToast(){
  //Toast de confirmación
  const toast = await this.toastController.create({
  message: 'El recordatorio ha sido añadido.',
  duration: 2000
  });
  toast.present();

  }
  }
