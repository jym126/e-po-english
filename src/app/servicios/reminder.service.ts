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
    async notifications(id, date, title, descript) {
      let time = date.toString();
      let myId = parseInt(id)
      time = time.slice(11,16);
      if(time !== '00:00'){
      await LocalNotifications.schedule({
      notifications: [{
      id: id+1,
      title: title,
      body: descript,
      schedule: {at: new Date(date)}
      }]
      });
      this.sendToast(date, title);
      }
    }

    async sendToast(date, title){
      //Toast de confirmación
      const toast = await this.toastController.create({
      message: 'Added event '+title+' on '+date,
      duration: 2500
      });
      toast.present();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      }
}
