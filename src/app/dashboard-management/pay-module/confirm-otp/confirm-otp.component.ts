import { FormType } from './../../../utility/enums/enum';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {LoadingController, ToastController} from '@ionic/angular';
import { Verification } from 'src/app/user-management/@model/Verification';
import {NgOtpInputConfig} from 'ng-otp-input';
import { Customer } from 'src/app/user-management/@model/Customer';
@Component({
  selector: 'app-confirm-otp',
  templateUrl: './confirm-otp.component.html',
  styleUrls: ['./confirm-otp.component.scss'],
})
export class ConfirmOtpComponent implements OnInit {
  headerText = 'Pay';
  public length: number;
  public maxLength: number;
  token = '';
  numbers = new Array(3);
  msg = '';
  type: FormType;
  verification: Verification;
  customer: Customer;

  title = 'Agoora Pvt Ltd';
  subTitle='wants payment for the amount';
  amount = '34667';

  config: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };

  constructor(public translate: TranslateService,
              public toastController: ToastController,
              private router: Router,
              public loadingController: LoadingController) {
    //this.setLanguage();
  }

  ngOnInit() {

  }

  // async confirmOtp() {


  //   if (this.token === '') {
  //     this.msg = 'Please Enter the OTP';

  //   } else if (this.type === FormType.registration) {
  //     this.verification = {
  //       ...this.getVerificationData(),
  //       verificationCode: this.token,
  //       ...this.resData,
  //     };
  //     this.customerVerification();
  //   } else if (this.card) {
  //     if (this.type === FormType.card) {
  //       this.createCard();
  //     } else if (this.type === FormType.payment) {

  //     }
  //   } else {
  //     this.msg = 'Something went wrong please try again';
  //     // this.loadingController.dismiss().then();
  //     // await this.router.navigateByUrl('/dashboard');
  //   }

  // }

  confirmOtp(){
    this.router.navigateByUrl('dashboard/pay/payment-success');
  }

  onOtpChange(otp) {
    this.token = otp;
    console.log(this.token);
  }

}
