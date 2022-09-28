import { EnterAmountComponent } from './enter-amount/enter-amount.component';
import { CardListComponent } from './card-list/card-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { PaymentMessageComponent } from './payment-message/payment-message.component';
import { QrScanComponent } from './qr-scan/qr-scan.component';
import { CardPopupComponent } from './card-popup/card-popup.component';
import {Scan03Component} from "./scan03/scan03.component";
import {SendMoney02Component} from "./send-money02/send-money02.component";
import {Card03Component} from "./card03/card03.component";
import {CreditCard02Component} from "./credit-card02/credit-card02.component";

const routes: Routes = [
  {path: 'otp', component: OtpVerificationComponent, pathMatch: 'full'},
  {path: 'message', component: PaymentMessageComponent, pathMatch: 'full'},
  {path: 'qr', component: QrScanComponent, pathMatch: 'full'},
  {path: 'card-list', component: CardListComponent, pathMatch: 'full'},
  {path: 'card-popup', component: CardPopupComponent, pathMatch: 'full'},
  {path: 'enter-amount', component: EnterAmountComponent, pathMatch: 'full'},
  {path: 'scan03', component: Scan03Component, pathMatch: 'full'},
  {path: 'sendmoney03', component: SendMoney02Component, pathMatch: 'full'},
  {path: 'card03', component: Card03Component, pathMatch: 'full'},
  {path: 'creditcard02', component: CreditCard02Component, pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule {
}
