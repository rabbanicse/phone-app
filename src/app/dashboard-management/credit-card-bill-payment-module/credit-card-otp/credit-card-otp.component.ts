import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NgOtpInputConfig } from 'ng-otp-input';
import { Customer } from 'src/app/user-management/@model/Customer';
import { Card } from '../../@model/Card';
import { CardService } from '../../@service/card.service';

@Component({
  selector: 'app-credit-card-otp',
  templateUrl: './credit-card-otp.component.html',
  styleUrls: ['./credit-card-otp.component.scss'],
})


export class CreditCardOtpComponent implements OnInit {
  headerText = 'Credit Card Bill Pay';

  config: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  token = '';
  numbers = new Array(3);
  msg = '';
  customer: Customer;
  title = 'Credit card Bill Payment';
  subTitle='15000.00 + 150.00 (Charge)';
  amount = '15150.00';

  constructor(protected readonly modalController: ModalController,private router: Router,private cardService: CardService) { }

  ngOnInit() {
  }
  dismiss() {
    this.modalController.dismiss();
  }
  onOtpChange(otp) {
    this.token = otp;
    console.log(this.token);
  }
  confirmOtp(){
    this.router.navigateByUrl('dashboard/bill-pay/credit-card-payment');
  }


}
