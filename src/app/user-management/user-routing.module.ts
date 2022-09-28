import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NidScanComponent } from './nid-scan/nid-scan.component';
import { RegistationComponent } from './registation/registation.component';
import {NidScannerDetailsComponent} from './nid-scanner-details/nid-scanner-details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AddDeviceOtpComponent } from './add-device-otp/add-device-otp.component';
import { ChangePinComponent } from './change-pin/change-pin.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';



const routes: Routes = [
  {path: 'nid', component: NidScanComponent, pathMatch: 'full'},
  {path: 'register', component: RegistationComponent, pathMatch: 'full'},
  {path: 'nid-details', component: NidScannerDetailsComponent, pathMatch: 'full'},
  {path: 'forgot-password', component: ForgotPasswordComponent, pathMatch: 'full'},
  {path: 'add-device-otp', component: AddDeviceOtpComponent, pathMatch: 'full'},
  {path: 'change-pin', component: ChangePinComponent, pathMatch: 'full'},
  {path: 'change-password', component: ChangePasswordComponent, pathMatch: 'full'},
  {path: 'email-verified', component: EmailVerifiedComponent, pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
