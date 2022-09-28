import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { PaymentMessageComponent } from './payment-message/payment-message.component';
import { QrScanComponent } from './qr-scan/qr-scan.component';
import {ApplicationHeaderComponent} from './application-header/application-header.component';
import { HeaderComponent } from './header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import {CommonModule } from '@angular/common';
import {NgOtpInputModule} from 'ng-otp-input';
import { CardListComponent } from './card-list/card-list.component';
import { CardPopupComponent } from './card-popup/card-popup.component';
import { EnterAmountComponent } from './enter-amount/enter-amount.component';
import {Scan03Component} from "./scan03/scan03.component";
import {Card03Component} from "./card03/card03.component";
import {SendMoney02Component} from "./send-money02/send-money02.component";
import {CreditCard02Component} from "./credit-card02/credit-card02.component";
import { BackButtonDirective } from '../utility/back-button-directive';
@NgModule({
  declarations: [
    OtpVerificationComponent,
    PaymentMessageComponent,
    QrScanComponent,
    ApplicationHeaderComponent,
    HeaderComponent,
    CardListComponent,
    CardPopupComponent,
    EnterAmountComponent,
    Scan03Component,
    SendMoney02Component,
    Card03Component,
    CreditCard02Component,
    BackButtonDirective
  ],
  exports: [
    ApplicationHeaderComponent,
    TranslateModule
  ],
    imports: [
        SharedRoutingModule,
        FormsModule,
        IonicModule,
        TranslateModule,
        CommonModule,
        NgOtpInputModule
    ]
})
export class SharedModule {
}
