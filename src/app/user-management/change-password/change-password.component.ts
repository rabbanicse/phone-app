import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Device } from '@capacitor/device';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserManagerService } from '../@service/user-manager.service';
import { ChangePassword } from '../@model/ChangePassword';
import { Router } from '@angular/router';
import { MustMatch } from './validator';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  changePayloadPassword = {} as ChangePassword;
  deviceId: any;
  deviceInfo: any;
  emptyPin: boolean;
  submitted = false;

  constructor(
    public toastController: ToastController,
    public userService: UserManagerService,
    public loadingController: LoadingController,
    private router: Router,
    private fb: FormBuilder

  ) { }

  async ngOnInit() {
    this.initFormGroup();
    this.deviceId = await Device.getId();
    this.deviceInfo = await Device.getInfo();
  }


  initFormGroup() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },{
      validator: MustMatch('newPassword', 'confirmPassword')
    });
  }


  async onSubmitForChangePin() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
  }

    this.changePayloadPassword.clientType = await this.userService.getClientType();
    this.changePayloadPassword.newPin = this.changePasswordForm.value.newPassword;
    this.changePayloadPassword.oldPin = this.changePasswordForm.value.oldPassword;
    this.changePayloadPassword.forcePinPassChange = 'Y';
    this.changePayloadPassword.deviceName = this.deviceInfo.model;
    this.changePayloadPassword.deviceNumber = this.deviceId.uuid;
    this.changePayloadPassword.hardwareSignature = this.deviceId.uuid;
    this.changePayloadPassword.mobileAppVersion = this.deviceInfo.osVersion;
    this.changePayloadPassword.mobileAppVersionCode = 1;
    this.changePayloadPassword.requestId = await this.userService.getRequestId();
    this.changePayloadPassword.sessionToken = await this.userService.getSessionToken();



    console.log('global::', this.changePayloadPassword);
    console.log('global', await this.userService.getSessionToken());
    if (this.inputValidate()) {
      this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
      }).then(res => res.present());
      this.userService.changePin(this.changePayloadPassword).subscribe(
        (res) => {
          if (res.status == 200) {
            console.log('hanif firstApiCall', res);
            this.router.navigateByUrl('/').then(() => {
              this.loadingController.dismiss().then();
              this.toastController.create({
                message: 'Password changed Successfully',
                duration: 2000,
                color: 'success',
                position: 'bottom'
              }).then(async suc => {
                await suc.present();
              });
              console.log('Password Change success');
            });
          }
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
    } else {
      console.log('invalid input');
    }
  }


  inputValidate() {
  let ret = true;
    if (this.changePayloadPassword.newPin) {
      this.changePayloadPassword.newPin.trim();
    }
    if (this.changePayloadPassword.oldPin) {
      this.changePayloadPassword.oldPin.trim();
    }
    if ((!this.changePayloadPassword.newPin || this.changePayloadPassword.newPin === '')
      && (!this.changePayloadPassword.oldPin || this.changePayloadPassword.oldPin === '')
      && (!this.changePasswordForm.value.confirmPassword || this.changePasswordForm.value.confirmPassword === '')) {
      this.emptyPin = true;
      ret = false;
    } else {
      this.emptyPin = false;
    }
    return ret;
  }

  get f() { return this.changePasswordForm.controls; }
}
