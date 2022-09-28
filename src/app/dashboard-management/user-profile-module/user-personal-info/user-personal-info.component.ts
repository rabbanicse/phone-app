import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {UserManagerService} from '../../../user-management/@service/user-manager.service';
import {Camera, CameraResultType, Photo,} from '@capacitor/camera';
import {CheckPhoneNoStatus} from '../../../user-management/@model/CheckPhoneNoStatus';
import {Filesystem} from '@capacitor/filesystem';
import {LoadingController, Platform, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NidServiceService} from '../../../user-management/@service/nid-service.service';
import {Device, DeviceInfo} from '@capacitor/device';
import {SafeResourceUrl} from '@angular/platform-browser';
import {mergeMap} from 'rxjs/operators';
import {ImageCropModalService} from '../../../user-management/@service/image-crop-modal.service';
import {UserProfileInfo} from 'src/app/user-management/@model/UserProfileInfo';

export interface UserPhoto {
  filepath?: string;
  webviewPath?: string;
}

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-personal-info.component.html',
  styleUrls: ['./user-personal-info.component.scss'],
})
export class UserPersonalInfoComponent implements OnInit {
  userProfileForm: FormGroup;
  headerText = 'User Profile';

  isNidImagesLoading = true;

  baseDp = '/assets/icon/prof_pic.jpg';
  imageData: SafeResourceUrl;
  fontNidImage: SafeResourceUrl;
  backNidImage: SafeResourceUrl;
  nidNo$: any;
  userdata = {};
  emaildata = {};
  frontImage = {} as LocalFile;

  defaultDp: '/assets/icon/prof_pic.jpg';

  public frontSideImage: UserPhoto;
  public backSideImage: UserPhoto;
  public captureImage1 = false;
  public captureImage2 = false;

  profileImageBase64 = '';
  profileInfoData = {} as UserProfileInfo;

  checkPhoneStatus: CheckPhoneNoStatus;
  deviceInfo: DeviceInfo = {} as DeviceInfo;
  private deviceId: any;


  constructor(
    private plt: Platform,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private router: Router,
    public imageService: NidServiceService,
    public translate: TranslateService,
    private userManagerService: UserManagerService,
    private imageCropModalService: ImageCropModalService,
    private loadingCtrl: LoadingController,
  ) {}

  async ngOnInit() {
    //
    // await this.loadingCtrl.create({
    //   cssClass: 'my-custom-class',
    //   message: 'Please wait...',
    // });
    this.deviceId = await Device.getId();
    this.deviceInfo = await Device.getInfo();

    await this.getProfileImage();
    await this.getUserProfileInfo();
    await this.getEmailId();
    await this.getNidNo();
    await this.getUserInfoFromLocalStorage();
    await this.getNidImages();
    console.log('Nid:',this.nidNo$);
    // await this.loadingCtrl.dismiss()
  }

  async getNidNo() {
    this.userManagerService.getNidNo().then(data => {
      this.nidNo$ = data;
      console.log('Nid:',data);
    });
  };

  async getUserInfoFromLocalStorage() {
    this.userManagerService.getUserInfo().then((res) => {
      this.userdata = res;
      console.log(this.userdata);
    });
  }

  async getProfileImage() {
    const payload = {
      fileName: await this.userManagerService.getProfilePicture(),
    };

    this.userManagerService.getProfileImage(payload).subscribe(
      (res) => {
        console.log(res);
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onloadend = () => {
          this.imageData = reader.result;
        };
      },
      (error) => {
        // console.log('aaaaaaaaaaaaaa');
        console.log(error);
      }
    );
  }

  async getUserProfileInfo() {
    const profileInfoData = {
      mobileNumber: await this.userManagerService.getPhoneNo(),
      deviceName: this.deviceInfo.model,
      deviceNumber: this.deviceId.uuid,
      hardwareSignature: this.deviceId.uuid,
      mobileAppVersion: this.deviceInfo.osVersion,
      mobileAppVersionCode: 1,
      requestId: await this.userManagerService.getRequestId(),
      clientType: await this.userManagerService.getClientType(),
      sessionToken: await this.userManagerService.getSessionToken(),

    }
    console.log('userProfileInfo', profileInfoData);

    this.userManagerService.getUserProfileInfo(profileInfoData).subscribe(res => {
      console.log('profile', res);
      this.profileInfoData = res;
    })
  }


  async getNidImages() {
    const payloadForNid = {
      clientType: 'softbyte-customer-wallet',
      //requestId: AppUtils.generateId(16),
      requestId: await this.userManagerService.getRequestId(),
      hardwareSignature: this.deviceId.uuid,
      sessionToken: await this.userManagerService.getSessionToken(),
    };

    this.userManagerService.getNidPhotos(payloadForNid).subscribe(
      (res) => {
        console.log(res);

        const readerForFront = new FileReader();
        readerForFront.readAsDataURL(res.frontSide);
        readerForFront.onloadend = () => {
          this.fontNidImage = readerForFront.result;
        };
        const readerForBack = new FileReader();
        readerForBack.readAsDataURL(res.backSide);
        readerForBack.onloadend = () => {
          this.backNidImage = readerForBack.result;
        };
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.isNidImagesLoading = false;
      }
    );
  }

  async changeProfilePhoto() {

    const capturedPhoto = await Camera.getPhoto({
      quality: 10,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    if (capturedPhoto) {
      this.captureImage1 = true;

      console.log(capturedPhoto);

      // const splitImageBase64 = capturedPhoto.dataUrl.split(',')[1];

      this.imageCropModalService
        .show(capturedPhoto.webPath)
        .then(async (result) => {
          console.log(result);
          this.profileImageBase64 = result;
          const splitImageBase64 = this.profileImageBase64.split(',')[1];
          await this.saveImages(splitImageBase64);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async getEmailId() {
    this.userManagerService.getEmailVerification()
      .then(res => {
        console.log('sonia', res);
        let result
        if (res === 'V') {
          result = 'Email Varified'
        } else {
          result = 'Email Not Varified'
        }
        this.emaildata = result;
        console.log(this.emaildata);
      });
  }

  async saveImages(base64image) {
    // const data = await this.readAsBase64(photo);
    // const getBase64 = data.split(',')[1];
    const payload = {
      ...POSTMAN_DATA,
      file: base64image,
      requestId: await this.userManagerService.getRequestId(),
      deviceNumber: this.deviceId.uuid,
      deviceName: this.deviceInfo.model,
      hardwareSignature: this.deviceId.uuid,
      mobileAppVersion: this.deviceInfo.osVersion,
      sessionToken: await this.userManagerService.getSessionToken(),
    };
    console.log(payload);
    const loading = await this.loadingCtrl.create({
      message: 'Uploading..',
    });
    await loading.present();
    this.userManagerService
      .uploadProfileImage(payload)
      .pipe(
        mergeMap((res) => {
          console.log(res);
          const payloadImage = {
            fileName: res.data.documentName,
          };
          console.log(payloadImage);
          return this.userManagerService.getProfileImage(payloadImage);
        })
      )
      .subscribe(
        (res) => {
          const readerForFront = new FileReader();
          readerForFront.readAsDataURL(res);
          readerForFront.onloadend = () => {
            this.imageData = readerForFront.result;
          };
          loading.dismiss();
          console.log(res);
        },
        (error) => {
          loading.dismiss();
          console.log(error);
        }
      );

    // console.log(response.split(',')[1]);
  }

  async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });
      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
        }
      };
      reader.readAsDataURL(blob);
    });
}

const POSTMAN_DATA = {
  documentType: 'PROFILE_PICTURE',
  fileType: 'jpg',
  deviceName: 'samsung SM-G610F Android 8.1.0',
  deviceNumber: 'a9eeec9c7c67a2eb',
  hardwareSignature: 'a9eeec9c7c67a2eb',
  mobileAppVersion: '1.0.0',
  mobileAppVersionCode: 1,
  requestId: '0AB67E06AA542716',
};

interface UploadImage {
  documentType: string;
  file: string;
  fileType: string;
  deviceName: string;
  deviceNumber: string;
  hardwareSignature: string;
  mobileAppVersion: string;
  mobileAppVersionCode: number;
  requestId: string;
  sessionToken: string;
}
