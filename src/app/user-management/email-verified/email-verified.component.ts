import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Device} from "@capacitor/device";
import { LoadingController, ToastController } from "@ionic/angular";
import { UserManagerService } from "../@service/user-manager.service";
import {Router} from "@angular/router";
import { emailVerified } from '../../user-management/@model/emailVerified';



@Component({
  selector: 'app-change-password',
  templateUrl: './email-verified.component.html',
  styleUrls: ['./email-verified.component.scss'],
})
export class EmailVerifiedComponent implements OnInit {

  emailVerifiedForm: FormGroup;
  emailPayloadVerified = {} as emailVerified;
  deviceId: any;
  deviceInfo: any;

  useremaildata = {};

  constructor(
    public toastController: ToastController,
    public userService: UserManagerService,
    public loadingController: LoadingController,
    private router: Router

  ) { }

  async ngOnInit() {
    this.initFormGroup()
    this.deviceId = await Device.getId();
    this.deviceInfo = await Device.getInfo();

    await this.getUserInfoFromLocalStorage();

  }


  initFormGroup() {
    this.emailVerifiedForm = new FormGroup({
      emailaddress: new FormControl('', Validators.required),
    });
  }

  async getUserInfoFromLocalStorage() {
    this.userService.getUserInfo().then((res) => {
      this.useremaildata = res;
      console.log(this.useremaildata);
    });
  }

  async onSubmitemailVerified() {

    this.emailPayloadVerified.emailaddress = this.emailVerifiedForm.value.emailaddress;
    this.emailPayloadVerified.mobileNumber = await this.userService.getPhoneNo();
    this.emailPayloadVerified.deviceName = this.deviceInfo.model;
    this.emailPayloadVerified.deviceNumber = this.deviceId.uuid;
    this.emailPayloadVerified.hardwareSignature = this.deviceId.uuid;
    this.emailPayloadVerified.mobileAppVersion = this.deviceInfo.osVersion;
    this.emailPayloadVerified.mobileAppVersionCode = 1;
    this.emailPayloadVerified.requestId = await this.userService.getRequestId();
    this.emailPayloadVerified.sessionToken = await this.userService.getSessionToken();



    console.log("global::", this.emailPayloadVerified);
    console.log("global", await this.userService.getSessionToken());


    this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    }).then(res => res.present());
    this.userService.emailVerificatiion(this.emailPayloadVerified).subscribe(
      res => {
        console.log('hanif firstApiCall', res);
        this.router.navigateByUrl("/").then(() => {
          this.loadingController.dismiss().then();
        });
      },
      error => {
        console.log(error);
        this.loadingController.dismiss().then()
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
