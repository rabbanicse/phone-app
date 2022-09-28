import {Component, Input, OnInit} from '@angular/core';
import {ImageCroppedEvent, ImageTransform, LoadedImage} from 'ngx-image-cropper';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss'],
})
export class CropImageComponent implements OnInit {

  @Input() image = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';

  canvasRotation = 0;
  rotation = 0;
  transform: ImageTransform = {};

  constructor(private modal: ModalController) {
  }

  ngOnInit() {

    console.log(this.image);
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;

    console.log('this.imageChangedEvent', this.imageChangedEvent);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // console.log("this.croppedImage", this.croppedImage)
  }

  imageLoaded(image: LoadedImage) {
    // console.log(image.transformed.base64);
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  disMissModal() {
    this.modal.dismiss(this.croppedImage);
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }
}
