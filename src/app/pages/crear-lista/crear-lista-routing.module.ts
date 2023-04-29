import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearListaPage } from './crear-lista.page';

const routes: Routes = [
  {
    path: '',
    component: CrearListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearListaPageRoutingModule {}
