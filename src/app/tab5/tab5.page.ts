import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ListaService } from '../servicios/lista.service';
import { element } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  listaAlmacenada: any = [];

  constructor(private alertController: AlertController,
              private listaService: ListaService,
              private router: Router) { }

  ngOnInit() {
    this.listas();
  }

  async listas() {
    this.listaService.listas()
    .subscribe(res => {
      this.listaAlmacenada.push(res);
    });
    console.log(this.listaAlmacenada);
  }

  async actualizarLista(lista) {
    this.router.navigate(['../pages/crear-lista', {data: JSON.stringify(lista)}] );
  }

  async presentListConfirm(id: string, nombre: string) {
    const alert = await this.alertController.create({
      header: 'Borrar tarea',
      message: `¿Estás seguro que quieres borrar la lista <strong> ${nombre}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Aceptar',
          handler: async() => {
            this.listaService.borrarLista(id)
            .subscribe(async(res) => {
              console.log(res);
              if(res['message'] === 'borrada') {
                const alert = await this.alertController.create({
                  message: 'Artículo borrado con éxito',
                });
                await alert.present();
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
