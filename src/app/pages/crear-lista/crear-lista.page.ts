import { Component, OnInit } from '@angular/core';
import { ListaService } from 'src/app/servicios/lista.service';
import { Lista } from 'src/app/modelos/lista';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-lista',
  templateUrl: './crear-lista.page.html',
  styleUrls: ['./crear-lista.page.scss'],
})
export class CrearListaPage implements OnInit {

  data: any;

  lista: Lista = {
    id: "", 
    nombre: '', 
    descripcion: '', 
    cantidad: 1, 
    unidad: 'Ud'};

  constructor(private listaService: ListaService,
              private router: Router,
              private alertController: AlertController,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.data = JSON.parse(this.route.snapshot.paramMap.get("data"));
    if(this.data) {
      this.lista = this.data;
    }
  }

  crearLista() {
    this.listaService.crearLista(this.lista)
    .subscribe(res => {
      if(res['message'] == 'creada') {
        const alert = this.alertController.create({
          message: `Lista ${this.lista.nombre} actualizada`
        });
      }
    })
    this.router.navigate(['tabs/tab5']);
  }

  actualizarLista() {
    this.listaService.actualizarLista(this.lista, this.lista.id)
    .subscribe(res => {
      if(res['message'] == 'actualizada') {
        const alert = this.alertController.create({
          message: `Lista ${this.lista.nombre} actualizada`
        });
      }
    })
  }
}
