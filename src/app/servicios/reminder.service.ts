import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(
    public toastController: ToastController) { }

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
      this.sendToast(date, titulo);
      }
    }

    async sendToast(date, titulo){
      //Toast de confirmación
      const toast = await this.toastController.create({
      message: 'Añadido evento '+titulo+' para el '+date,
      duration: 3000
      });
      toast.present();

      }
}
