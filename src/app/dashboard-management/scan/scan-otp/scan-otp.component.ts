import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { NgOtpInputConfig } from 'ng-otp-input';
import { Customer } from 'src/app/user-management/@model/Customer';
import { Verification } from 'src/app/user-management/@model/Verification';
import { UserManagerService } from 'src/app/user-management/@service/user-manager.service';
import { FormType } from 'src/app/utility/enums/enum';
import { Card } from '../../@model/Card';
import { CardService } from '../../@service/card.service';

@Component({
  selector: 'app-scan-otp',
  templateUrl: './scan-otp.component.html',
  styleUrls: ['./scan-otp.component.scss'],
})
export class ScanOtpComponent implements OnInit {

  public length: number;
  public maxLength: number;
  token = '';
  numbers = new Array(3);
  msg = '';
  card: Card;
  type: FormType;
  verification: Verification;
  resData: any;
  customer: Customer;

  config: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };

  constructor(public translate: TranslateService, private service: CardService,
              public toastController: ToastController,
              private router: Router,
              private userService: UserManagerService,
              public loadingController: LoadingController) {
    //this.setLanguage();
  }

  ngOnInit() {

    this.card = history.state.data || {};
    this.type = history.state.type;
    this.customer = history.state.customer || {};
    this.resData = history.state.resData || {};

    console.log(history.state);
  }

  async confirmOtp() {


    if (this.token === '') {
      this.msg = 'Please Enter the OTP';

    } else if (this.type === FormType.registration) {
      this.verification = {
        ...this.getVerificationData(),
        verificationCode: this.token,
        ...this.resData,
      };
      this.customerVerification();
    } else if (this.card) {
      if (this.type === FormType.card) {
        this.createCard();
      } else if (this.type === FormType.payment) {

      }
    } else {
      this.msg = 'Something went wrong please try again';
      // this.loadingController.dismiss().then();
      // await this.router.navigateByUrl('/dashboard');
    }
  }


  sendOtp(){
  }


  customerVerification() {
    this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    }).then(res => res.present());


    this.userService.customerVerification(this.verification).subscribe(res => {
      this.loadingController.dismiss().then();
      this.toastController.create({
        message: "Registered Successfully",
        duration: 2000,
        color: 'success',
        position: 'bottom'
      }).then(async suc => {
        await suc.present();
      });
      this.router.navigateByUrl('/');
      
    }, err => {
      this.loadingController.dismiss().then();
      this.msg = 'OTP is not matching, please try again';

    });
  }

  createCard() {
    this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    }).then(res => res.present());

    this.service.createCard(this.card).subscribe(async () => {
      this.service.notify('cardAdded');
      this.loadingController.dismiss().then();

      await this.router.navigateByUrl('/common/message', {
        state: {
          title: 'Card Added Successfully',
          desc: `Congratulation! You have successfully added your ${this.card.cardType} card `
        }
      });

    }, error => {
      this.loadingController.dismiss().then();
    });
  }

  async registration() {
    await this.router.navigateByUrl('/common/message', {
      state: {
        title: 'Congratulations',
        desc: `You registration is completed`
      }
    });
  }

  getVerificationData() {
    return this.verification = {
      mobileNumber: this.customer.mobileNumber,
      referenceId: 'xbgykiqxhevndpmb1652990283828',
      userType: '5',
      verificationCode: '<',
      deviceName: 'samsung SM-G610F Android 8.1.0',
      deviceNumber: 'a9eeec9c7c67a2eb',
      // eslint-disable-next-line max-len
      hardwareSignature: '0dce008e21997595f62688d375321a230f51e89405fa9ac79db10f04d4898b0f00853bf03975fcf880821dc7449ef812dccf93984efb4b1c4c5b68e87f1c7931',
      mobileAppVersion: '2.3.1_IW_DEMO',
      mobileAppVersionCode: 50,
      requestId: 'D9B6E1E53FA310C6',
      sessionToken: ''
    };
  }

  onOtpChange(otp) {
    this.token = otp;
    console.log(this.token);
  }

}
