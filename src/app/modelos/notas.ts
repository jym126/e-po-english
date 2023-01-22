/* eslint-disable eol-last */

export class Notas {
    id?: number;
    titulo: string;
    imagen?: Imagen[];
    descripcion: string;
  }

  export class Imagen {
    id?: number;
    ruta: string;
}