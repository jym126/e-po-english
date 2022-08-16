import { Component, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { AgendaService } from 'src/app/servicios/agenda.service';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements AfterViewInit {
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
    lockSwipes: false
  };
  viewTitle: string;

  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: null,
    startHour: null,
    endHour: '',
    allDay: true,
    allDayLabel: 'Evento'
  };

  modalReady = false;

  constructor(private modalCtrl: ModalController) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;
    }, 0);
  }

  save() {
    this.modalCtrl.dismiss({event: this.event});
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  //Al seleccionar una fecha en el modal lo unico que hacemos es crear un nuevo evento "event"
  onTimeSelected(ev) {
    const endTime = (ev.detail.value.slice(11,16));
    this.event.startTime = new Date(ev.detail.value);
    this.event.endHour = endTime;
    console.log(this.event.startTime);

    this.save();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
