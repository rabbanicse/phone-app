import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserPersonalInfoComponent} from './user-personal-info/user-personal-info.component';
import {UserOveviewComponent} from './user-oveview/user-oveview.component';
import {UserUpdateNidScanComponent} from './user-update-nid-scan/user-update-nid-scan.component';
import {UserUpdateNidDetailsComponent} from './user-update-nid-details/user-update-nid-details.component';
import {UserInfoSuccessComponent} from './user-info-success/user-info-success.component';


const routes: Routes = [
  {path: 'user-overview', component: UserOveviewComponent, pathMatch: 'full'},
  {path: 'user-personal-info', component: UserPersonalInfoComponent, pathMatch: 'full'},
  {path: 'user-personal-nid-scan', component: UserUpdateNidScanComponent, pathMatch: 'full'},
  {path: 'user-personal-nid-details', component: UserUpdateNidDetailsComponent, pathMatch: 'full'},
  {path: 'user-info-success', component: UserInfoSuccessComponent, pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {
}
