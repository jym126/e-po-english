export class Contactos {
    id?: number;
    nombre: string;
    apellidos: string;
    telefono: string;
    direccion?: string;
    email: string;
    imagen?: Imagen[];
    cumpleaños?: string;
    relacion?: string;
    contactos?: string;
}

export class Imagen {
    id?: number;
    ruta: string;
}
