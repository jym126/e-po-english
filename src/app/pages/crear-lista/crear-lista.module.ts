import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearListaPageRoutingModule } from './crear-lista-routing.module';

import { CrearListaPage } from './crear-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearListaPageRoutingModule
  ],
  declarations: [CrearListaPage]
})
export class CrearListaPageModule {}
