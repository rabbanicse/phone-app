import { FormType } from './../../../utility/enums/enum';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {LoadingController, ToastController} from '@ionic/angular';
import { Verification } from 'src/app/user-management/@model/Verification';
import { NgOtpInputConfig } from 'ng-otp-input';
import { Customer } from 'src/app/user-management/@model/Customer';

@Component({
  selector: 'app-send-money-payment-otp',
  templateUrl: './send-money-payment-otp.component.html',
  styleUrls: ['./send-money-payment-otp.component.scss'],
})
export class SendMoneyPaymentOtpComponent implements OnInit {
  public length: number;
  public maxLength: number;
  token = '';
  numbers = new Array(3);
  msg = '';
  type: FormType;
  verification: Verification;
  customer: Customer;

  title = 'From Your Debit Card';
  subTitle='01761172122 will recieve the amount';
  amount = '34667';
  headerText = 'Send Money';

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



  confirmOtp(){
    this.router.navigateByUrl('/dashboard/send-money/otp-success');
  }

  onOtpChange(otp) {
    this.token = otp;
    console.log(this.token);
  }
}
