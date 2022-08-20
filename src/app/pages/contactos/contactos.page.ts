/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ContactosService } from 'src/app/servicios/contactos.service';
import { ImageService } from 'src/app/servicios/image.service';



@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {

  contactos: FormGroup;

  imgRes: any;
  options: any;
  imagen = ['assets/contactos/noimagen.jpg'];

  constructor(private fb: FormBuilder,
              private sContactos: ContactosService,
              private sImagen: ImageService) {
                this.contactos = this.fb.group({
                  nombre: ['', Validators.required],
                  apellidos: ['', Validators.required],
                  direccion: ['', Validators.required],
                  email: ['', Validators.required],
                  telefono: ['', Validators.required],
                  imagen:['']
                });
    }

  ngOnInit() {
  }

  onSubmit() {
    const contacto = this.contactos.value;
    this.sContactos.guardarContacto(contacto);
  }

captura() {
  this.sImagen.capturaImagen().then(imagen => {  this.imagen.unshift(imagen);
    this.contactos.value.imagen = imagen;});
}

}
