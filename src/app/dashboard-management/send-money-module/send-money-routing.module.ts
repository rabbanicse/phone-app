import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SelectPhoneNoComponent} from './select-phone-no/select-phone-no.component';
import {SelectPaymentCardComponent} from './select-payment-card/select-payment-card.component';
import {ReceiverComponent} from './receiver/receiver.component';
import {SendMoneyPaymentOtpComponent} from './send-money-payment-otp/send-money-payment-otp.component';
import {SendMoneySuccessComponent} from './send-money-success/send-money-success.component';
import { CardPopupComponent } from './card-popup/card-popup.component';

const routes: Routes = [

  {path: 'select-phone-no', component: SelectPhoneNoComponent},
  {path: 'select-payment-card', component: SelectPaymentCardComponent},
  {path: 'card-popup', component: CardPopupComponent},
  {path: 'select-receiver', component: ReceiverComponent},
  {path: 'payment-otp', component: SendMoneyPaymentOtpComponent},
  {path: 'otp-success', component: SendMoneySuccessComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendMoneyRoutingModule {
}
