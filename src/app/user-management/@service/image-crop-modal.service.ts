import {Injectable} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DomSanitizer} from '@angular/platform-browser';
import {NgxImageCompressService} from 'ngx-image-compress';
import {CropImageComponent} from '../crop-image/crop-image.component';

@Injectable({
  providedIn: 'root'
})
export class ImageCropModalService {

  constructor(
    public modalController: ModalController,
    private domSanitizer: DomSanitizer,
    private imageCompress: NgxImageCompressService
  ) {
  }

  async show(image: string): Promise<string | null> {
    // Lazy load the image crop modal (an Angular Ivy feature)
    const {CropImageComponent} = await import(`../crop-image/crop-image.component`);

    const modal: HTMLIonModalElement = await this.modalController.create({
      component: CropImageComponent,
      componentProps: {image},
    });

    await modal.present();

    const result = await modal.onWillDismiss();

    if (result.data) {
      return result.data;
    } else {
      return null;
    }
  }

  async imageCompression(dataUrl, orientation, ratio) {
    return this.imageCompress.compressFile(dataUrl, orientation, ratio);
  }

  async getImageDataFromModalComponent(base64) {
    return this.modalController.create({
      component: CropImageComponent,
      componentProps: {
        image: base64
      }
    });
  }

}
