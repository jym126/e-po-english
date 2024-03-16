import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/servicios/agenda.service';
import { Storage } from '@ionic/storage-angular';
import { formatDate } from '@angular/common';
import { AlertController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  agenda: any[] = [];
  private _storage: Storage | null = null;
  tips = ["You can events to calendar tha appears in the main page" ,
          "You can add remider to taks to be notified on time",
          "A bell icon will be added to task with reminders",
          "A color dot will be set in days with events in calendar",
          "If item list last to load you can drag dowm page to refresh",
          "Pictures or photos can be added to the sticky notes"];

  todayTips: string;
  pendingTasks: string;
  pendingNotes: string;

  constructor(private router: Router,
              private storage: Storage,
              @Inject(LOCALE_ID) private locale: string,
              private alertCtrl: AlertController,
              private sAgenda: AgendaService) { }

  async ngOnInit() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.listaAgenda();
    this.randomTips();
    this.pending();
  }

  async listaAgenda() {
    const agenda = await this._storage.get('agenda');
    this.agenda = agenda || [];
    return this.agenda;
  }

    // Calendar event was clicked
    async onEventSelected(event) {
      // Use Angular date pipe for conversion
      const start = formatDate(event.startTime, 'medium', this.locale);

      const alert = await this.alertCtrl.create({
        header: 'Event',
        subHeader: event.title + ': ' + event.desc,
        message: 'The ' + start.slice(0, start.length - 7) +' at '+ event.endHour,
        cssClass: 'danger',
        buttons: [
          {
            text: 'Del',
            handler: () => {this.sAgenda.borrarAgenda(event.id), this.ngOnInit()},
          }, {
            text: 'Ok'
          }
        ]
    });
    alert.present();

  }

  //Function to show tips of the day to show in home page
  randomTips() {
    this.todayTips = this.tips[(Math.floor(Math.random() * this.tips.length))];
  }

  //Get the numbers of created tasks and notes to show in home page
  async pending() {
    let tareas = await this._storage.get('tareas');
    this.pendingTasks = tareas.length
    let notes = await this._storage.get('notas');
    this.pendingNotes = notes.length
  }




}
