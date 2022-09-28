import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPopupComponent } from './card-popup/card-popup.component';
import { MobileRechargeOtpComponent } from './mobile-recharge-otp/mobile-recharge-otp.component';
import { MobileRechargePaymentSuccessComponent } from './mobile-recharge-payment-success/mobile-recharge-payment-success.component';
import { MobileRechargePaymentComponent } from './mobile-recharge-payment/mobile-recharge-payment.component';
import { MobileRechargeComponent } from './mobile-recharge/mobile-recharge.component';


const routes: Routes = [
  {path:'mobile-recharge', component: MobileRechargeComponent},
  {path:'mobile-recharge-otp', component: MobileRechargeOtpComponent},
  {path:'mobile-recharge-payment', component: MobileRechargePaymentComponent},
  {path:'card-popup', component: CardPopupComponent},
  {path:'mobile-recharge-payment-success', component: MobileRechargePaymentSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRechargeRoutingModule { }
