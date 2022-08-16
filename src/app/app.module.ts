import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            FormsModule,
            ReactiveFormsModule,
            IonicStorageModule.forRoot(),
            HttpClientModule
          ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, { provide: LOCALE_ID, useValue: 'es-ES' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
