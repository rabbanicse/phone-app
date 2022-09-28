import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserManagerService } from '../@service/user-manager.service';
import { CheckPhoneNoStatus } from '../@model/CheckPhoneNoStatus';
import { TranslateService } from '@ngx-translate/core';
import { Operator } from 'src/app/utility/enums/enum';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registation',
  templateUrl: './registation.component.html',
  styleUrls: ['./registation.component.scss'],
})
export class RegistationComponent implements OnInit {
  registrationForm: FormGroup;

  public checkPhoneNoStatus: CheckPhoneNoStatus = new CheckPhoneNoStatus();
  msg = '';
  termsConditions: boolean = false;
  imageRobi: any;
  imageBl: any;
  imageAirtel: any;
  imageGp: any;
  imageTeletalk: any;
  submitted = false;
  isClassChange = false;

  constructor(
    public translate: TranslateService,
    private userService: UserManagerService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  async onSubmit() {
    if (
      this.checkPhoneNoStatus.mobileNumber == undefined ||
      this.checkPhoneNoStatus.termsConditions == undefined ||
      this.checkPhoneNoStatus.operator == undefined
    ) {
      this.toastController
        .create({
          message:
            'Please Enter a Phone Number, Select Operator & Select Terms & Conditions',
          duration: 2000,
          color: 'warning',
          position: 'bottom',
        })
        .then(async (suc) => {
          await suc.present();
        });
      return;
    }
    (this.checkPhoneNoStatus.mobileNumber =
      this.checkPhoneNoStatus.mobileNumber),
      (this.checkPhoneNoStatus.deviceName = 'samsung SM-G610F Android 8.1.0'),
      (this.checkPhoneNoStatus.deviceNumber = 'a9eeec9c7c67a2eb'),
      (this.checkPhoneNoStatus.hardwareSignature =
        '0dce008e21997595f62688d375321a230f51e89405fa9ac79db10f04d4898b0f00853bf03975fcf880821dc7449ef812dccf93984efb4b1c4c5b68e87f1c7931'),
      (this.checkPhoneNoStatus.mobileAppVersion = '2.3.1_IW_DEMO'),
      (this.checkPhoneNoStatus.mobileAppVersionCode = 50),
      (this.checkPhoneNoStatus.productCode = 'IW'),
      (this.checkPhoneNoStatus.requestId = 'D9A830F0A11759FF'),
      (this.checkPhoneNoStatus.sessionToken = ''),
      (this.checkPhoneNoStatus.operator = this.checkPhoneNoStatus.operator),
      (this.checkPhoneNoStatus.termsConditions =
        this.checkPhoneNoStatus.termsConditions);
    this.loadingController
      .create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
      })
      .then((res) => res.present());
    this.userService
      .getMobileNumberStatus(this.checkPhoneNoStatus)
      .subscribe((res) => {
        console.log(res);
        this.loadingController.dismiss();
        // debugger;
        this.router.navigateByUrl('/nid', {
          state: { ...this.checkPhoneNoStatus },
        }),
          (error) => {
            this.loadingController.dismiss();
            this.toastController
              .create({
                message: `${error.error.error.message}`,
                duration: 2000,
                color: 'danger',
                position: 'top',
              })
              .then(async (suc) => {
                await suc.present();
              });
          };
      });
  }

  //  async onSubmit() {
  //     if (this.checkPhoneNoStatus.mobileNumber == undefined || this.checkPhoneNoStatus.termsConditions == undefined || this.checkPhoneNoStatus.operator == undefined) {
  //       debugger;
  //       this.toastController
  //         .create({
  //           message: 'Please Enter a Phone Number, Select Operator & Select Terms & Conditions',
  //           duration: 2000,
  //           color: 'warning',
  //           position: 'bottom',
  //         })
  //         .then(async (suc) => {
  //           await suc.present();
  //         });
  //     } else {
  //       // this.checkPhoneNoStatus = {
  //       //   mobileNumber: this.registrationForm.value.mobileNumber,
  //       //   deviceName: 'samsung SM-G610F Android 8.1.0',
  //       //   deviceNumber: 'a9eeec9c7c67a2eb',
  //       //   // eslint-disable-next-line max-len
  //       //   hardwareSignature:
  //       //     '0dce008e21997595f62688d375321a230f51e89405fa9ac79db10f04d4898b0f00853bf03975fcf880821dc7449ef812dccf93984efb4b1c4c5b68e87f1c7931',
  //       //   mobileAppVersion: '2.3.1_IW_DEMO',
  //       //   mobileAppVersionCode: 50,
  //       //   productCode: 'IW',
  //       //   requestId: 'D9A830F0A11759FF',
  //       //   sessionToken: '',
  //       //   operator:0,
  //       //   termsConditions:false
  //       // } as CheckPhoneNoStatus;

  //       this.checkPhoneNoStatus.mobileNumber = this.checkPhoneNoStatus.mobileNumber,
  //       this.checkPhoneNoStatus.deviceName = 'samsung SM-G610F Android 8.1.0',
  //       this.checkPhoneNoStatus.deviceNumber = 'a9eeec9c7c67a2eb',
  //       this.checkPhoneNoStatus.hardwareSignature =  '0dce008e21997595f62688d375321a230f51e89405fa9ac79db10f04d4898b0f00853bf03975fcf880821dc7449ef812dccf93984efb4b1c4c5b68e87f1c7931',
  //       this.checkPhoneNoStatus.mobileAppVersion = '2.3.1_IW_DEMO',
  //       this.checkPhoneNoStatus.mobileAppVersionCode = 50,
  //       this.checkPhoneNoStatus.productCode = 'IW',
  //       this.checkPhoneNoStatus.requestId = 'D9A830F0A11759FF',
  //       this.checkPhoneNoStatus.sessionToken = '',
  //       this.checkPhoneNoStatus.operator = this.checkPhoneNoStatus.operator,
  //       this.checkPhoneNoStatus.termsConditions = this.checkPhoneNoStatus.termsConditions
  //       debugger;
  //       this.loadingController
  //         .create({
  //           cssClass: 'my-custom-class',
  //           message: 'Please wait...',
  //         })
  //         .then((res) => res.present());

  //       this.userService.getMobileNumberStatus(this.checkPhoneNoStatus).subscribe(
  //         (res) => {
  //           console.log(res);
  //           this.loadingController.dismiss();
  //           debugger;
  //           this.router.navigateByUrl('/nid', {
  //             state: { ...this.checkPhoneNoStatus },
  //           });

  //           /*this.toastController.create({
  //             message: 'Customer created Successfully.',
  //             duration: 2000,
  //             color: 'success',
  //             position: 'top'
  //           }).then( async suc => {
  //             await suc.present();
  //             await this.router.navigateByUrl('/nid');
  //           });*/
  //         },
  //         (err) => {
  //           this.loadingController.dismiss();
  //           this.toastController
  //             .create({
  //               message: `${err.error.error.message}`,
  //               duration: 2000,
  //               color: 'danger',
  //               position: 'top',
  //             })
  //             .then(async (suc) => {
  //               await suc.present();
  //             });
  //         }
  //       );
  //     }
  //   }

  get f() {
    return this.registrationForm.controls;
  }

  showPreviewBl() {
    this.checkPhoneNoStatus.operator = Number(
      document.getElementById('blImg').getAttribute('value')
    );
    if (this.checkPhoneNoStatus.operator == Operator.BANGLALINK) {
      this.checkPhoneNoStatus.operator = Operator.BANGLALINK;
      this.isClassChange = true;
      // debugger;
      console.log('BL', this.checkPhoneNoStatus.operator);
    }
  }
  showPreviewRobi() {
    this.checkPhoneNoStatus.operator = Number(
      document.getElementById('robiImg').getAttribute('value')
    );
    if (this.checkPhoneNoStatus.operator == Operator.ROBI) {
      this.checkPhoneNoStatus.operator = Operator.ROBI;
      this.isClassChange = true;
      console.log('ROBI', this.checkPhoneNoStatus.operator);
    }
  }
  showPreviewAirtel() {
    this.checkPhoneNoStatus.operator = Number(
      document.getElementById('airtelImg').getAttribute('value')
    );
    if (this.checkPhoneNoStatus.operator == Operator.AIRTEL) {
      this.checkPhoneNoStatus.operator = Operator.AIRTEL;
      this.isClassChange = true;
      console.log('AIRTEL', this.checkPhoneNoStatus.operator);
    }
  }

  showPreviewGp() {
    this.checkPhoneNoStatus.operator = Number(
      document.getElementById('gpImg').getAttribute('value')
    );
    if (this.checkPhoneNoStatus.operator == Operator.GRAMEENPHONE) {
      this.checkPhoneNoStatus.operator = Operator.GRAMEENPHONE;
      this.isClassChange = true;
      console.log('GRAMEENPHONE', this.checkPhoneNoStatus.operator);
    }
  }

  showPreviewTeletalk() {
    this.checkPhoneNoStatus.operator = Number(
      document.getElementById('teletalkImg').getAttribute('value')
    );
    if (this.checkPhoneNoStatus.operator == Operator.TELETALK) {
      this.checkPhoneNoStatus.operator = Operator.TELETALK;
      this.isClassChange = true;
      console.log('TELETALK', this.checkPhoneNoStatus.operator);
    }
  }
}
