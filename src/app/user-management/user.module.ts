import { NgModule } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NidScanComponent } from './nid-scan/nid-scan.component';
import { RegistationComponent } from './registation/registation.component';
import { UserRoutingModule } from './user-routing.module';
import { NidScannerDetailsComponent } from './nid-scanner-details/nid-scanner-details.component';
import { SharedModule } from '../shared-module/shared.module';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AddDeviceOtpComponent } from './add-device-otp/add-device-otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { TranslateModule } from '@ngx-translate/core';
import { ChangePinComponent } from './change-pin/change-pin.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';


@NgModule({
  declarations: [
    NidScanComponent,
    RegistationComponent,
    NidScannerDetailsComponent,
    ForgotPasswordComponent,
    AddDeviceOtpComponent,
    ChangePinComponent,
    ChangePasswordComponent,
    EmailVerifiedComponent
  ],
  exports: [
    TranslateModule
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    UserRoutingModule,
    IonicModule,
    CommonModule,
    SharedModule,
    NgOtpInputModule,
    ImageCropperModule
  ]
})
export class UserModule {
}
