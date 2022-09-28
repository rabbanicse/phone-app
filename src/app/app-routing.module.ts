import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {LoginComponent} from './user-management/login/login.component';
import {RegistationComponent} from './user-management/registation/registation.component';


const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'registration', component: RegistationComponent, pathMatch: 'full'},
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard-management/dashboard.module').then(m => m.DashboardModule)
  },
  {path: 'common', loadChildren: () => import('./shared-module/shared.module').then(m => m.SharedModule)},
  {path: '', loadChildren: () => import('./user-management/user.module').then(m => m.UserModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    TranslateModule
  ],
  exports: [
    RouterModule,
    TranslateModule
  ]
})
export class AppRoutingModule {
}
