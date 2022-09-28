import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CreditCardBillPaymentRoutingModule} from './credit-card-bill-payment-routing.module';
import {IonicModule} from '@ionic/angular';
import {NgOtpInputModule} from 'ng-otp-input';
import {CreditCardBillPayComponent} from './credit-card-bill-pay/credit-card-bill-pay.component';
import {CreditCardPaymentComponent} from './credit-card-payment/credit-card-payment.component';
import {CreditCardOtpComponent} from './credit-card-otp/credit-card-otp.component';
import { SelectCreditCardComponent, CardSelectedService } from './select-credit-card/select-credit-card.component';
import {SharedModule} from '../../shared-module/shared.module';
import { CardPopupComponent } from './card-popup/card-popup.component';
import { PayToSelectCardComponent } from './pay-to-select-card/pay-to-select-card.component';


@NgModule({
  declarations: [
    CreditCardBillPayComponent,
    CreditCardPaymentComponent,
    CreditCardOtpComponent,
    CardPopupComponent,
    SelectCreditCardComponent,
    PayToSelectCardComponent
  ],
  imports: [
    CommonModule,
    CreditCardBillPaymentRoutingModule,
    IonicModule,
    SharedModule,
    NgOtpInputModule
  ],
  providers: [CardSelectedService]
})
export class CreditCardBillPaymentModule {
}
