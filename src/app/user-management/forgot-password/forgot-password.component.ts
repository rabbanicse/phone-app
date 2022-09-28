import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Device, DeviceInfo} from '@capacitor/device';
import {FORGOT_PASSWORD_DATA, ForgotPassword} from '../@model/ForgotPassword';
import {LoadingController, ToastController} from '@ionic/angular';
import {UserManagerService} from '../@service/user-manager.service';
import {ResetPassword} from '../@model/ResetPassword';
import {NgOtpInputConfig} from 'ng-otp-input';
import {Router} from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  showTokenChip = false;
  resetPayloadPassword = {} as ResetPassword;
  forgotPayloadPassword = {} as ForgotPassword;
  config: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  token = '';

  deviceId: any;
  deviceInfo: DeviceInfo = {} as DeviceInfo;

  constructor(
    public toastController: ToastController,
    public userService: UserManagerService,
    public loadingController: LoadingController,
    private router: Router
  ) {
  }

  async ngOnInit() {
    this.initFormGroup();
    // console.log(await Device.getInfo())
    this.deviceId = await Device.getId();
    this.deviceInfo = await Device.getInfo();
    console.log(this.deviceInfo.model);
    console.log(this.deviceId);

  }


  initFormGroup() {
    this.forgotPasswordForm = new FormGroup({
      mobileNumber: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  onSubmit() {


    for (const i in this.forgotPasswordForm.controls) {
      if (this.forgotPasswordForm.controls.hasOwnProperty(i)) {
        this.forgotPasswordForm.controls[i].markAsDirty();
        this.forgotPasswordForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.forgotPasswordForm.value.mobileNumber === '') {
      this.toastController.create({
        message: 'Please Enter a phone number',
        duration: 2000,
        color: 'warning',
        position: 'top'
      }).then(async suc => {
        await suc.present();
      });
    } else {
      this.forgotPayloadPassword = {
        ...FORGOT_PASSWORD_DATA,
        deviceNumber: this.deviceId.uuid,
        deviceName: this.deviceInfo.model,
        hardwareSignature: this.deviceId.uuid,
        mobileAppVersion: this.deviceInfo.osVersion,
        mobileNumber: this.forgotPasswordForm.value.mobileNumber,
      };

      this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
      }).then(res => res.present());
      this.userService.forgotPin(this.forgotPayloadPassword).subscribe(
        res => {
          this.showTokenChip = true;
          this.loadingController.dismiss().then();
        },
        error => {
          console.log(error);
          this.loadingController.dismiss().then();
          this.toastController.create({
            message: `${error.error.error.message}`,
            duration: 2000,
            color: 'danger',
            position: 'top'
          }).then(async suc => {
            await suc.present();
          });
        });
    }
  }

  onOtpChange(otp) {
    this.token = otp;
    console.log(this.token);
  }


  onSubmitForResetPin() {

    for (const i in this.forgotPasswordForm.controls) {
      if (this.forgotPasswordForm.controls.hasOwnProperty(i)) {
        this.forgotPasswordForm.controls[i].markAsDirty();
        this.forgotPasswordForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.forgotPasswordForm.value.mobileNumber === '') {
      this.toastController.create({
        message: 'Please Enter a phone number',
        duration: 2000,
        color: 'warning',
        position: 'top'
      }).then(async suc => {
        await suc.present();
      });
    } else {
      this.resetPayloadPassword = {
        ...this.forgotPayloadPassword,
        newPin: this.forgotPasswordForm.value.confirmPassword,
        secretKey: this.token

      };
      this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
      }).then(res => res.present());
      this.userService.resetPin(this.resetPayloadPassword).subscribe(
        res => {
          this.showTokenChip = false;
          this.loadingController.dismiss().then(() => {
            this.router.navigateByUrl('/').then();
          });
        },
        error => {
          console.log(error);
          // this.showTokenChip = false
          this.loadingController.dismiss().then();
          this.toastController.create({
            message: `${error.error.error.message}`,
            duration: 2000,
            color: 'danger',
            position: 'top'
          }).then(async suc => {
            await suc.present();
          });
        });
    }
  }
}
