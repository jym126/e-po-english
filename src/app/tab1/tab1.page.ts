/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Tareas } from '../modelos/tareas';
import { TareasService } from '../servicios/tareas.service';
import { AlertController } from '@ionic/angular';
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
              public toastController: ToastController
              ) {
                this.init();
              }

  ngOnInit() {
  }

  //Function para restablecer el estado de los elementos checkbox al reiniciar la app
  init() {
    setTimeout(() => {
      for(let i = 0; i<=this.checked.length; i++){
        const a: string = i.toString();
        document.getElementById(a).setAttribute('style',this.checked[i]);
        if(this.checked[i] !== ''){
          const checkbox = document.getElementById('c'+a,) as HTMLInputElement | null;
          checkbox.checked = true;
        }
      }
    }, 500);
  }

  get tareasAlmacenadas() {
    return this.sTareas.getLocalTareas;
  }

  get checked() {
    return this.sTareas.getChecked;
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
            this.sTareas.borrarTarea(id);
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
    item.isChecked ? this.sTareas.guardarCheck(item.id, 'text-decoration:line-through'):
    this.sTareas.guardarCheck(item.id, '');
    document.getElementById(item.id).setAttribute('style',this.checked[item.id]);
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
