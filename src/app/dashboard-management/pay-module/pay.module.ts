import { PayRoutingModule } from './pay-routing.module';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { ConfirmOtpComponent } from './confirm-otp/confirm-otp.component';
import { ShowQrCodeComponent } from './show-qr-code/show-qr-code.component';
import { SelectCardComponent } from './select-card/select-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared-module/shared.module';
import {NgOtpInputModule} from 'ng-otp-input';
import { CardPopupComponent } from './card-popup/card-popup.component';



@NgModule({
  declarations: [
    SelectCardComponent,
    ShowQrCodeComponent,
    ConfirmOtpComponent,
    CardPopupComponent,
    PaymentSuccessComponent
  ],
    imports: [
        CommonModule,
        PayRoutingModule,
        IonicModule,
        SharedModule,
        NgOtpInputModule
    ]
})
export class PayModule { }
