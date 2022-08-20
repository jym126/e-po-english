/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Imagen } from '../modelos/contactos';
import { Camera, CameraResultType } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imagen: Imagen[] = [];

  private _storage: Storage | null = null;

  constructor() {}



  public borrarImagen(id: number) {
    this.imagen = this.imagen.filter(t => t.id !== id);
    return this._storage.set('imagenes', this.imagen);
}

capturaImagen = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
    promptLabelHeader: 'Seleccione el origen de la imagen',
    promptLabelPhoto: 'Desde la galería',
    promptLabelPicture: 'Desde la cámara',
    promptLabelCancel: 'Cancelar'
  });

  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  const imageUrl = image.webPath;

  // Can be set to the src of an image now
  return imageUrl;
};

}
