import { RouterModule, Routes } from '@angular/router';
import { RentTemplateComponent } from './rent-template/rent-template.component';
import {NgModule} from '@angular/core';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { RentPageComponent } from './rent-page/rent-page.component';
import { RentPreviewComponent } from './rent-preview/rent-preview.component';
import { SelectTenantComponent } from './select-tenant/select-tenant.component';
import { RentSuccessComponent } from './rent-success/rent-success.component';
import { TenantSlipComponent } from './tenant-slip/tenant-slip.component';
import { TenantPreviewComponent } from './tenant-preview/tenant-preview.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardPopupComponent } from './card-popup/card-popup.component';
import { OtpComponent } from './otp/otp.component';




const routes: Routes = [
  {path: 'rent-template', component: RentTemplateComponent},
  {path: 'edit-template', component: EditTemplateComponent},
  {path: 'edit-template/update/:id', component: EditTemplateComponent},
  {path: 'rent-page', component: RentPageComponent},
  {path: 'rent-preview', component: RentPreviewComponent},
  {path: 'select-tenant', component: SelectTenantComponent},
  {path: 'rent-success', component: RentSuccessComponent},
  {path: 'tenant-slip', component: TenantSlipComponent},
  {path: 'tenant-preview', component: TenantPreviewComponent},
  {path: 'tenant-preview/update/:id', component: TenantPreviewComponent},
  {path: 'card-list', component: CardListComponent},
  {path: 'card-popup', component: CardPopupComponent},
  {path: 'otp', component: OtpComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentRoutingModule {
}
