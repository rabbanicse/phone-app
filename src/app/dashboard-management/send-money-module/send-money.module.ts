import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SendMoneyRoutingModule} from './send-money-routing.module';
import {ReceiverComponent} from './receiver/receiver.component';
import {SelectPhoneNoComponent} from './select-phone-no/select-phone-no.component';
import {SendMoneyPaymentOtpComponent} from './send-money-payment-otp/send-money-payment-otp.component';
import {SendMoneySuccessComponent} from './send-money-success/send-money-success.component';
import {IonicModule} from '@ionic/angular';
import {SharedModule} from '../../shared-module/shared.module';
import {SelectPaymentCardComponent} from './select-payment-card/select-payment-card.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { CardPopupComponent } from './card-popup/card-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReceiverComponent,
    SelectPhoneNoComponent,
    SelectPaymentCardComponent,
    CardPopupComponent,
    SendMoneyPaymentOtpComponent,
    SendMoneySuccessComponent
  ],
  imports: [
    CommonModule,
    SendMoneyRoutingModule,
    IonicModule,
    SharedModule,
    NgOtpInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SendMoneyModule {
}
