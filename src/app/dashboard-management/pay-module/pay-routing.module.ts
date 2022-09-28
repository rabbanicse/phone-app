import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { ConfirmOtpComponent } from './confirm-otp/confirm-otp.component';
import { ShowQrCodeComponent } from './show-qr-code/show-qr-code.component';
import { SelectCardComponent } from './select-card/select-card.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CardPopupComponent } from './card-popup/card-popup.component';

const routes: Routes = [
  {path: 'select-pay-card', component: SelectCardComponent},
  {path: 'show-qr-code', component: ShowQrCodeComponent},
  {path: 'confirm-otp', component: ConfirmOtpComponent},
  {path: 'card-popup', component: CardPopupComponent},
  {path: 'payment-success', component: PaymentSuccessComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayRoutingModule {
}
