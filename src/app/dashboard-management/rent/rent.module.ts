import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { RentRoutingModule } from './rent-routing.module';
import { RentTemplateComponent } from './rent-template/rent-template.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { RentPageComponent } from './rent-page/rent-page.component';
import { RentPreviewComponent } from './rent-preview/rent-preview.component';
import { SelectTenantComponent } from './select-tenant/select-tenant.component';
import { RentSuccessComponent } from './rent-success/rent-success.component';
import { IonicModule } from '@ionic/angular';
import { NgOtpInputModule } from 'ng-otp-input';
import { TenantSlipComponent } from './tenant-slip/tenant-slip.component';
import { TenantPreviewComponent } from './tenant-preview/tenant-preview.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardPopupComponent } from './card-popup/card-popup.component';
import { OtpComponent } from './otp/otp.component';





@NgModule({
  declarations: [
    RentTemplateComponent,
    EditTemplateComponent,
    RentPageComponent,
    RentPreviewComponent,
    SelectTenantComponent,
    RentSuccessComponent,
    TenantSlipComponent,
    TenantPreviewComponent,
    CardListComponent,
    CardPopupComponent,
    OtpComponent,
  ],
  imports: [
    CommonModule,
    RentRoutingModule,
    SharedModule,
    IonicModule,
    NgOtpInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RentModule { }
