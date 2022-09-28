import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard-management/dashboard/dashboard.component';
import {LoginComponent} from './user-management/login/login.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgOtpInputModule} from 'ng-otp-input';
import {DashboardModule} from './dashboard-management/dashboard.module';
import {ImageCropperModule} from 'ngx-image-cropper';
import {NgxImageCompressService} from 'ngx-image-compress';


@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent],
  entryComponents: [],
  imports: [
    HammerModule,
    ImageCropperModule,
    NgOtpInputModule,
    ReactiveFormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    DashboardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    FormsModule
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    NgxImageCompressService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoaderInterceptor,
    //   multi: true,
    // },
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
