import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserProfileRoutingModule} from './user-profile-routing.module';
import {SharedModule} from '../../shared-module/shared.module';
import {UserUpdateNidScanComponent} from './user-update-nid-scan/user-update-nid-scan.component';
import {IonicModule} from '@ionic/angular';
import {UserUpdateNidDetailsComponent} from './user-update-nid-details/user-update-nid-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UserInfoSuccessComponent} from './user-info-success/user-info-success.component';
import {UserOveviewComponent} from './user-oveview/user-oveview.component';
import {UserPersonalInfoComponent} from './user-personal-info/user-personal-info.component';


@NgModule({
  declarations: [
    UserUpdateNidScanComponent,
    UserUpdateNidDetailsComponent,
    UserInfoSuccessComponent,
    UserOveviewComponent,
    UserPersonalInfoComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule,
    IonicModule,
    ReactiveFormsModule,

  ]
})
export class UserProfileModule {
}
