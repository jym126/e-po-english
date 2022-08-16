/* eslint-disable @typescript-eslint/semi */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tareas } from 'src/app/modelos/tareas';
import { TareasService } from 'src/app/servicios/tareas.service';


@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.page.html',
  styleUrls: ['./crear-tarea.page.scss'],
})
export class CrearTareaPage implements OnInit {

  tarea: Tareas = {titulo: '', descripcion: ''};

  constructor(private router: Router,
              private sTareas: TareasService) { }

  ngOnInit() {
}

guardarTarea() {
  this.sTareas.guardarTarea(this.tarea)
  this.router.navigate(['tabs/tab1']);
}

}

