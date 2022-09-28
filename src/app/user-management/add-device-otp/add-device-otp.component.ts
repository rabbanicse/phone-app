import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Card } from 'src/app/dashboard-management/@model/Card';
import { FormType } from 'src/app/utility/enums/enum';
import { Verification } from '../@model/Verification';
import { UserManagerService } from '../@service/user-manager.service';
import { PhoneADevice } from '../../dashboard-management/@model/phoneADevice';
import { NgOtpInputConfig } from 'ng-otp-input';
import { ResendOtp } from '../@model/ResendOTP';

@Component({
  selector: 'app-add-device-otp',
  templateUrl: './add-device-otp.component.html',
  styleUrls: ['./add-device-otp.component.scss'],
})
export class AddDeviceOtpComponent implements OnInit {
  headerText = 'Add New Device';
  public length: number;
  public maxLength: number;
  token = '';
  numbers = new Array(3);
  msg = '';
  type: FormType;
  verification: Verification;
  isResendOtp =false;
  resendOtp: ResendOtp;
  addDeviceObj: PhoneADevice;

  config: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };

  constructor(
    public translate: TranslateService,
    public toastController: ToastController,
    private router: Router,
    private userService: UserManagerService,
    public loadingController: LoadingController) {
  }

  ngOnInit() {
    this.addDeviceObj = history.state.otpData;
    console.log('addDeviceObj', this.addDeviceObj);
  }

  async confirmOtp() {
    if (this.token === '') {
      this.msg = 'Please Enter the OTP';
    } else {
      this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
      }).then(res => res.present());

      this.addDeviceObj = {
        ...this.addDeviceObj,
        verificationCode: this.token,
      };
      console.log(this.addDeviceObj);
      this.userService.addDevice(this.addDeviceObj).subscribe(res => {
        this.loadingController.dismiss();
        this.router.navigateByUrl('/dashboard');

      }, err => {
        this.loadingController.dismiss();
        this.msg = err.error.error.message;
        // this.msg = 'OTP is not matching, please try again';

      });
    }

  }

  onOtpChange(otp) {
    this.token = otp;
    console.log(this.token);
  }

  resendOtpFn() {
    this.resendOtp = {
      mobileNumber: this.addDeviceObj.mobileNumber,
      referenceId: this.addDeviceObj.referenceId,
      purpose: '10', //Purpose should be 10 for add new device otp
      deviceName: this.addDeviceObj.deviceName,
      deviceNumber: this.addDeviceObj.deviceNumber,
      hardwareSignature: this.addDeviceObj.hardwareSignature,
      mobileAppVersion: '2.3.1_IW_DEMO',
      mobileAppVersionCode: 50,
      requestId: this.addDeviceObj.requestId,
      sessionToken: ''
    };
    this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    }).then(res => res.present());

    this.userService.resendOtp(this.resendOtp).subscribe(
      res => {
        if (res.status === 200) {
          this.isResendOtp= true;
          this.msg = 'Verification code was resend successfully';
          this.loadingController.dismiss().then();
          // this.toastController.create({
          //   message: 'Verification code was resend successfully',
          //   duration: 2000,
          //   color: 'success',
          //   position: 'bottom'
          // }).then(async suc => {
          //   await suc.present();
          // });
          //  this.router.navigateByUrl('/');
        } else {
          console.log('error');
        }
      }, error => {
        //  this.loadingController.dismiss().then();
        this.msg = error.error.error.message;

      });

  }
}
