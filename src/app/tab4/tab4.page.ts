/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalModalPage } from '../pages/cal-modal/cal-modal.page';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { AgendaService } from '../servicios/agenda.service';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  eventSource: any[] = [];
  viewTitle: string;

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
    step: 30 as Step,
    startHour: 6,
    endHour: 20,
    startingDayWeek: 1,
    startingDayMonth: 1
  };

  selectedDate: Date;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
            private alertCtrl: AlertController,
            @Inject(LOCALE_ID) private locale: string,
            private modalCtrl: ModalController,
            private sAgenda: AgendaService
  ) {this.carga();}

ngOnInit() {
  this.carga()
}

  get agendaAlmacenada() {
    return this.sAgenda.getLocalAgenda;
  }

  carga(){
    setTimeout(() => {
      this.eventSource = this.agendaAlmacenada;
      this.myCal.loadEvents();
    }, 500);
  }

  // Change current month/week/day
  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
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

async presentAlertConfirm() {
  const alert = await this.alertCtrl.create({
    header: 'Delete Agenda',
    message: `Are you sure? ALL events in calendar will be deleted</strong>`,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary'
      }, {
        text: 'Ok',
        handler: () => {
          this.removeEvents();
          this.sAgenda.borrarTodo();
        }
      }
    ]
  });

  await alert.present();
}

  removeEvents() {
    this.eventSource = [];
  }

  today() {
    this.calendar.currentDate = new Date();
}


  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false
    });

    await modal.present();

    modal.onDidDismiss().then((result) => {
      const events = [];
      if (result.data && result.data.event) {
        const event = result.data.event;
        if (event.allDay) {
          const start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
            )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()+1
            )
          );
        }
        this.eventSource.push(result.data.event);
        this.sAgenda.guardarAgenda(result.data.event);
        this.myCal.loadEvents();
      }
    });
  }

}
