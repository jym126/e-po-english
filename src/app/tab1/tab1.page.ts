/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Tareas } from '../modelos/tareas';
import { TareasService } from '../servicios/tareas.service';
import { AlertController } from '@ionic/angular';
import { ReminderService } from '../servicios/reminder.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild('popover') popover;

  isOpen = false;

  tareas: Tareas[] = [];

  estilo =  '';
  @ViewChild('dateTime') dateTime;

  id = "";
  date = new Date();
  day = String(this.date.getDate()).padStart(2, '0');
  month = String(this.date.getMonth()+1).padStart(2, '0');
  year = this.date.getFullYear();
  fullDate = `${this.year}-${this.month}-${this.day}T00:00`;



  constructor(private sTareas: TareasService,
              private alertController: AlertController,
              private reminder: ReminderService,
              private router: Router
              ) {
                this.init();
              }

  ngOnInit() {
  }

  async actualizarTarea(tarea) {
    this.router.navigate(['/crear-tarea', {data: JSON.stringify(tarea)}] );
  }

  //Function para restablecer el estado de los elementos checkbox al reiniciar la app
  init() {
    setTimeout(() => {
      if(this.checked.length > 0){
      for(let i = 0; i<=this.checked.length; i++){
        const a: string = i.toString();
        document.getElementById(a).setAttribute('style',this.checked[i] || null);
        if(this.checked[i] !== ''){
          const checkbox = document.getElementById('c'+a,) as HTMLInputElement | null;
          checkbox.checked = true;
        }
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
      header: 'Delete task',
      message: `¿Are you sure to delete task <strong> ${titulo}</strong>?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: () => {
            this.sTareas.borrarTarea(id);
          }
        }
      ]
    });

    await alert.present();
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  notifications(id, date, titulo, descript){
    this.reminder.notifications(id, date, titulo, descript);
    this.notify(id)
  }

  notify(id) {
    document.getElementById('n'+id).setAttribute('hidden', 'false')
  }


  check(item) {
    //ternario para tachar tarea realizada
    item.isChecked ? this.sTareas.guardarCheck(item.id, 'text-decoration:line-through'):
    this.sTareas.guardarCheck(item.id, '');
    document.getElementById(item.id).setAttribute('style',this.checked[item.id]);
    }

  }
