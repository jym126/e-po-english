import { Component, OnInit } from '@angular/core';
import { ListaService } from 'src/app/servicios/lista.service';
import { Lista } from 'src/app/modelos/lista';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-crear-lista',
  templateUrl: './crear-lista.page.html',
  styleUrls: ['./crear-lista.page.scss'],
})
export class CrearListaPage implements OnInit {

  data: any;

  lista: Lista = {
    nombre: '',
    descripcion: '',
    cantidad: 1,
    unidad: 'Ud'};

  constructor(private listaService: ListaService,
              private router: Router,
              private alertController: AlertController,
              private route: ActivatedRoute,
              private toast: ToastController) { }

  ngOnInit() {
    this.data = JSON.parse(this.route.snapshot.paramMap.get("data"));
    if(this.data) {
      this.lista = this.data;
    }
  }

  crearLista() {
    this.listaService.crearLista(this.lista)
    .subscribe(async(res) => {
      if(res['message'] == 'creada') {
        const toast = await this.toast.create({
          message: 'Artículo creado con éxito',
          duration: 2500,
        });
        toast.present();
      }
      this.ngOnInit();
    })
    this.router.navigate(['tabs/tab5']);
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  }

  actualizarLista() {
    this.listaService.actualizarLista(this.lista, this.data._id)
    .subscribe(async(res) => {
      if(res['message'] == 'actualizada') {
        const toast = await this.toast.create({
          message: 'Artículo actualizado con éxito',
          duration: 2000,
        });
        toast.present();
      }
    })
    this.router.navigate(['tabs/tab5']);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
}
