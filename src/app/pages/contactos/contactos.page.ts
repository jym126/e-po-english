import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactosService } from 'src/app/servicios/contactos.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {

  contactos: FormGroup;


  constructor(private fb: FormBuilder,
              private router: Router,
              private sContactos: ContactosService) {
                this.contactos = this.fb.group({
                  nombre: ['', Validators.required],
                  apellidos: ['', Validators.required],
                  direccion: ['', Validators.required],
                  email: ['', Validators.required],
                  telefono: ['', Validators.required]
                });
    }

  ngOnInit() {
  }

  onSubmit() {
    const contacto = this.contactos.value;
    this.sContactos.guardarContacto(contacto);
  }

  prueba() {
    this.router.navigateByUrl('tabs/tab3');
  }

}
