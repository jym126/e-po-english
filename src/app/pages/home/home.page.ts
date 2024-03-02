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

  constructor(private router: Router,
              private storage: Storage,
              @Inject(LOCALE_ID) private locale: string,
              private alertCtrl: AlertController) { }

  async ngOnInit() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.listaAgenda();
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
        header: event.title,
        subHeader: event.desc,
        message: 'The ' + start.slice(0, start.length - 7) +' at '+ event.endHour,
        buttons: ['OK'],
    });
    alert.present();

  }

}
