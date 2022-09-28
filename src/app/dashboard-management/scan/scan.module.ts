import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgOtpInputModule } from 'ng-otp-input';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { ScanComponent } from './scan/scan.component';
import { ScanDetailsComponent } from './scan-details/scan-details.component';
import { ScanOtpComponent } from './scan-otp/scan-otp.component';
import { ScanPaymentComponent } from './scan-payment/scan-payment.component';
import { ScanPaymentSuccessComponent } from './scan-payment-success/scan-payment-success.component';
import { ScanRoutingModule } from './scan-routing-module';
import { CardPopupComponent } from './card-popup/card-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ScanComponent,
    ScanDetailsComponent,
    ScanOtpComponent,
    ScanPaymentComponent,
    ScanPaymentSuccessComponent,
    CardPopupComponent,
  ],
  imports: [
    ScanRoutingModule,
    CommonModule,
    IonicModule.forRoot({}),
    NgOtpInputModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ScanComponent,
    ScanDetailsComponent,
    ScanOtpComponent,
    ScanPaymentComponent,
    ScanPaymentSuccessComponent
   ],
})
export class ScanModule { }
