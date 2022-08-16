import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';

import { Tab4PageRoutingModule } from './tab4-routing.module';
import { NgCalendarModule} from 'ionic2-calendar';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    NgCalendarModule
  ],
  declarations: [Tab4Page],

  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }]
})
export class Tab4PageModule {}
