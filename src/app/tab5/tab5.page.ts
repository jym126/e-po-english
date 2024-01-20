import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ListaService } from '../servicios/lista.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  load = false;
  listaAlmacenada: any = [];

  constructor(private alertController: AlertController,
              private listaService: ListaService,
              private router: Router,
              private toast: ToastController) { }

  ngOnInit() {
    this.listas();
  }

  async listas() {
    await this.listaService.listas()
    .subscribe(async res => {
      localStorage.setItem('lista', JSON.stringify(res));
      this.load = true;
      let data = localStorage.getItem('lista');
      await this.listaAlmacenada.push(JSON.parse(data));
    });
  }

  async actualizarLista(lista) {
    this.router.navigate(['/crear-lista', {data: JSON.stringify(lista)}] );
  }

  async presentListConfirm(id: string, nombre: string) {
    const alert = await this.alertController.create({
      header: 'Delete item',
      message: `¿Are you sure you want to delete the item <strong> ${nombre}</strong>?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: () => {
            this.listaService.borrarLista(id)
            .subscribe(async(res) => {
              if(res['message'] === 'borrada') {
                const toast = await this.toast.create({
                  message: 'Item deleted successfully',
                  duration: 2000,
                });
                toast.present();
              }
              this.listas
              this.doRefresh(event);
            });
          }
        }
      ]
    });
    await alert.present();
  }

  doRefresh(event) {
    window.location.reload();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}
