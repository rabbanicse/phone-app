import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPopupComponent } from './card-popup/card-popup.component';
import {CreditCardBillPayComponent} from './credit-card-bill-pay/credit-card-bill-pay.component';
import { CreditCardOtpComponent } from './credit-card-otp/credit-card-otp.component';
import { CreditCardPaymentComponent } from './credit-card-payment/credit-card-payment.component';
import { PayToSelectCardComponent } from './pay-to-select-card/pay-to-select-card.component';
import {SelectCreditCardComponent} from './select-credit-card/select-credit-card.component';

const routes: Routes = [
  {path:'credit-card', component: CreditCardBillPayComponent},
  {path:'select-credit-card', component: SelectCreditCardComponent},
  {path:'pay-to-select-card', component: PayToSelectCardComponent},
  {path:'credit-card-otp', component: CreditCardOtpComponent},
  {path:'credit-card-popup', component: CardPopupComponent},
  {path:'credit-card-payment', component: CreditCardPaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditCardBillPaymentRoutingModule { }
