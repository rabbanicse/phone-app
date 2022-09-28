import {Component, OnInit} from '@angular/core';
import {CheckPhoneNoStatus} from '../../../user-management/@model/CheckPhoneNoStatus';
import {Device, DeviceInfo} from '@capacitor/device';
import {ImageTransform} from 'ngx-image-cropper';
import {DataUrl, NgxImageCompressService} from 'ngx-image-compress';
import {UserManagerService} from '../../../user-management/@service/user-manager.service';
import {LoadingController, ModalController, Platform, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ImageCropModalService} from '../../../user-management/@service/image-crop-modal.service';
import {NidServiceService} from '../../../user-management/@service/nid-service.service';
import {Camera, CameraResultType} from '@capacitor/camera';

interface RegistrationUser {
  nid: string;
  name: string;
  dateOfBirth: string;
}

@Component({
  selector: 'app-user-update-nid-scan',
  templateUrl: './user-update-nid-scan.component.html',
  styleUrls: ['./user-update-nid-scan.component.scss'],
})
export class UserUpdateNidScanComponent implements OnInit {
  headerText = 'Update Profile';
  checkPhoneStatus: CheckPhoneNoStatus;
  registrationUser = {} as RegistrationUser;
  deviceInfo: DeviceInfo = {} as DeviceInfo;
  deviceId: any;


  // profilePicture = '';
  nidFrontPicture = '';
  nidBackPicture = '';

  // profilePictureBase64 = '';
  nidFrontPictureBase64 = '';
  nidBackPictureBase64 = '';

  canvasRotation = 0;
  rotation = 0;
  transform: ImageTransform = {};

  constructor(
    private imageCompress: NgxImageCompressService,
    private userManagerService: UserManagerService,
    private plt: Platform,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
    private modalController: ModalController,
    private imageCropModelService: ImageCropModalService,
    public nidService: NidServiceService) {
  }

  async ngOnInit() {
    this.deviceId = await Device.getId();
    this.deviceInfo = await Device.getInfo();
    this.checkPhoneStatus = history.state;
    console.log('nid scan', history.state);
  }

  async gotoDetailsPage() {
    // await this.router.navigateByUrl('/dashboard/user-info/user-personal-nid-details', {});

   if (!this.nidFrontPicture && !this.nidBackPicture) {
     this.toastCtrl.create({
       message: `Please Capture Images first`,
       duration: 2000,
       color: 'warning',
       position: 'bottom'
     }).then(async suc => {
         await suc.present();
       }
     );
   } else {
     await this.router.navigateByUrl('/dashboard/user-info/user-personal-nid-details', {
       state: {
         ocrData: this.registrationUser,
         checkPhoneStatus: this.checkPhoneStatus,
         frontSideImage64base: this.nidFrontPictureBase64,
         backSideImage64base: this.nidBackPictureBase64,
        //  profileImage64Base: this.profilePictureBase64
       }
     });
   }
  }


  // async takeProfilePicture() {
  //   const capturedPhoto = await this.capturePicture();
  //   console.log(capturedPhoto.base64String);
  //   this.imageCropModelService.imageCompression(
  //     capturedPhoto.webPath,
  //     50, 50
  //   ).then(async (result: DataUrl) => {
  //     const imageDataAfterCompress = result;
  //     const modal = await this.imageCropModelService.getImageDataFromModalComponent(imageDataAfterCompress);
  //     modal.onDidDismiss().then(async data => {
  //       this.profilePicture = data.data;
  //       this.profilePictureBase64 = data.data.split(',')[1];

  //     });
  //     return await modal.present();
  //   });
  // }

  async takeNidFrontPicture() {
    const capturedPhoto = await this.capturePicture();
    if (capturedPhoto) {

      this.imageCropModelService.imageCompression(
        capturedPhoto.webPath,
        90,
        90
      ).then(async (result: DataUrl) => {
        const imageDataAfterCompress = result;
        const modal = await this.imageCropModelService.getImageDataFromModalComponent(imageDataAfterCompress);
        modal.onDidDismiss().then(async data => {
          this.nidFrontPicture = data.data;
          this.nidFrontPictureBase64 = data.data.split(',')[1];
          await this.getNidFormData(result);
        });
        return await modal.present();
      });
    }
  }

  async capturePicture() {
    return await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
  }

  async takeNidBackPicture() {
    const capturedPhoto = await this.capturePicture();

    if (capturedPhoto) {
      this.imageCropModelService.imageCompression(
        capturedPhoto.webPath,
        50, 50
      ).then(async (result: DataUrl) => {
        const imageDataAfterCompress = result;
        const modal = await this.imageCropModelService.getImageDataFromModalComponent(imageDataAfterCompress);
        modal.onDidDismiss().then(async data => {
          this.nidBackPicture = data.data;
          this.nidBackPictureBase64 = data.data.split(',')[1];
          // await this.getNidFormData(result);
        });
        return await modal.present();
      });
    }
  }


  async getNidFormData(base64) {
    const base64Data = await fetch(base64);
    const blob = await base64Data.blob();
    const formData = new FormData();
    formData.append('nidFrontImage', blob);
    const loading = await this.loadingCtrl.create({
      message: 'Reading image...',
    });
    await loading.present();
    this.nidService.getNidUserData(formData).subscribe(
      res => {
        console.info('success =>', res);
        this.registrationUser = res;
        loading.dismiss();
      },
      err => {
        loading.dismiss();
      });
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
