/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ContactosService } from 'src/app/servicios/contactos.service';
import { ImageService } from 'src/app/servicios/image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contactos } from 'src/app/modelos/contactos';



@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {


  datos: Contactos = {
    nombre: '',
    apellidos: '',
    direccion: '',
    email: '',
    telefono: '',
    imagen: []
  };

  value: any;//propiedad que recoge los datos que vienen en la ruta desde editar en tab3
  foto = false;

  contactos: FormGroup;

  imgRes: any;
  options: any;
  imagen = ['assets/contactos/noimagen.jpg'];

  constructor(private fb: FormBuilder,
              private router: Router,
              private sContactos: ContactosService,
              private route: ActivatedRoute,
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
  this.value = JSON.parse(this.route.snapshot.paramMap.get('data')); //los datos vienen en la ruta al editar contactos desde tab3
  if(this.value) {
    this.datos = this.value;
    this.imagen.unshift(this.value.imagen);
  };
}

onSubmit(datos) {
  if(!this.foto) {
  this.contactos.value.imagen = this.value.imagen;
  }
  this.sContactos.guardarContacto(datos);
}

captura() {
  this.foto = true;
  this.sImagen.capturaImagen().then(imagen => {  this.imagen.unshift(imagen);
    this.contactos.value.imagen = imagen;});
}

volver() {
  this.router.navigate(['tabs/tab3']);
}

}
