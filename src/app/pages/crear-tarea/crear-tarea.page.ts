/* eslint-disable @typescript-eslint/semi */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tareas } from 'src/app/modelos/tareas';
import { TareasService } from 'src/app/servicios/tareas.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';


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
              private toast: ToastController) { }

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

}

