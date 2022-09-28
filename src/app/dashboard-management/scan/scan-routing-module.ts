import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPopupComponent } from './card-popup/card-popup.component';
import { ScanDetailsComponent } from './scan-details/scan-details.component';
import { ScanOtpComponent } from './scan-otp/scan-otp.component';
import { ScanPaymentSuccessComponent } from './scan-payment-success/scan-payment-success.component';
import { ScanPaymentComponent } from './scan-payment/scan-payment.component';
import { ScanComponent } from './scan/scan.component';



const routes: Routes = [
  {path:'scan', component: ScanComponent},
  {path:'scan-details', component: ScanDetailsComponent},
  {path:'scan-payment', component: ScanPaymentComponent},
  {path:'scan-otp', component: ScanOtpComponent},
  {path:'card-popup', component: CardPopupComponent},
  {path:'scan-payment-success', component: ScanPaymentSuccessComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ScanRoutingModule { }
