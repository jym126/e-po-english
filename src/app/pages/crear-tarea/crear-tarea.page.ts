/* eslint-disable @typescript-eslint/semi */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tareas } from 'src/app/modelos/tareas';
import { TareasService } from 'src/app/servicios/tareas.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.page.html',
  styleUrls: ['./crear-tarea.page.scss'],
})
export class CrearTareaPage implements OnInit {

  data: any;

  tarea: Tareas = {titulo: '', descripcion: ''};

  constructor(private router: Router,
              private sTareas: TareasService,
              private route: ActivatedRoute,
              private toast: ToastController,
              private alertController: AlertController) { }

  ngOnInit() {
    this.data = JSON.parse(this.route.snapshot.paramMap.get("data"));
    if(this.data) {
      this.tarea = this.data;
    }
}

guardarTarea() {
  this.sTareas.guardarTarea(this.tarea)
  this.router.navigate(['tabs/tab1']);
}

async alert() {
    const alert = await this.alertController.create({
      header: 'Empty task',
      message: `Task description can´t be empty!`,
      buttons: [ {
          text: 'Ok',
          handler: () => {
            alert.dismiss();
          }
        }
      ]
    });
     await alert.present();

}

checkDisabled() {
  if(this.tarea.descripcion === '') {
    return true;
  }else {
    return false;
  }
}

}

