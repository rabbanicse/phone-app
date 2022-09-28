import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileRechargeRoutingModule } from './mobile-recharge-routing.module';
import { IonicModule } from '@ionic/angular';
import { MobileRechargeComponent } from './mobile-recharge/mobile-recharge.component';
import { MobileRechargeOtpComponent } from './mobile-recharge-otp/mobile-recharge-otp.component';
import { MobileRechargePaymentSuccessComponent } from './mobile-recharge-payment-success/mobile-recharge-payment-success.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { MobileRechargePaymentComponent } from './mobile-recharge-payment/mobile-recharge-payment.component';
import { CardPopupComponent } from './card-popup/card-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MobileRechargeComponent,
    MobileRechargeOtpComponent,
    MobileRechargePaymentComponent,
    CardPopupComponent,
    MobileRechargePaymentSuccessComponent
  ],
  imports: [
    CommonModule,
    MobileRechargeRoutingModule,
    IonicModule.forRoot({}),
    NgOtpInputModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MobileRechargeModule { }
