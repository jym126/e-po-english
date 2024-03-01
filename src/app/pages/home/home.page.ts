import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/servicios/agenda.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  agenda: any[] = [];
  private _storage: Storage | null = null;

  constructor(private router: Router, private storage: Storage) { }

  async ngOnInit() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.listaAgenda();
  }

  async listaAgenda() {
    const agenda = await this._storage.get('agenda');
    this.agenda = agenda || [];
    console.log(this.agenda[0].title);
    return this.agenda;
  }

}
