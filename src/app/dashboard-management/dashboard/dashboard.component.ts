/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {Component, OnInit, Renderer2} from '@angular/core';
import {LoadingController, MenuController, Platform, ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@capacitor/storage';
import {PromotionalOffer} from '../@model/promotionalOffer';
import { Logout } from 'src/app/user-management/@model/logout';

// import { Device } from '@awesome-cordova-plugins/device/ngx';
import {Device} from '@capacitor/device';
import {DeviceService} from '../@service/device.service';
import { Router } from '@angular/router';
import { PromotionalOfferService } from '../@service/promotional-offer.service';
import { UserManagerService } from 'src/app/user-management/@service/user-manager.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  // promotionalOfferList: PromotionalOffer[] = [
  //   {imgUrl: "/assets/icon/1.jpg"},
  //   {imgUrl: "/assets/icon/2.jpg"},
  //   {imgUrl: "/assets/icon/3.jpg"},
  //   {imgUrl: "/assets/icon/4.jpg"}
  // ];

   promotionalOfferList: any[] = [];
  userdata = {};
  logoutPayload = {} as Logout;
  deviceId: any;
  deviceInfo: any;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private renderer2: Renderer2,
    public translate: TranslateService,
    public device: DeviceService,
    private promotionalService: PromotionalOfferService,
    private router: Router,
    private userManagerService: UserManagerService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    ) {
    //this.setLanguage();
  }


  async ngOnInit() {
    this.deviceId = await Device.getId();
    await this.getUserInfoFromLocalStorage();
    this.deviceInfo = await Device.getInfo();
    const info2 = await Device.getBatteryInfo();

    console.log('device id:',this.deviceId);
    console.log('device info:',this.deviceInfo);
    console.log('battery info:',info2);
    // console.log(this.platform)
    this.getPromotionalOffer();
  }

  async getUserInfoFromLocalStorage() {
    this.userManagerService.getUserInfo()
      .then(res => {
        this.userdata = res;
        console.log(this.userdata);
      });
  }

  openMenu() {
    this.menu.open();
  }

  onTogggleThemeChange($event: any) {
    if ($event.detail.checked) {
      this.renderer2.setAttribute(document.body, 'color-theme', 'dark');
    } else {
      this.renderer2.setAttribute(document.body, 'color-theme', 'light');

    }
  }

  async switchLanguage($event: any) {
    if ($event.detail.checked) {
      this.translate.use('Bangla');
      await this.setLang('Bangla');
    } else {
      this.translate.use('English');
      await this.setLang('English');
    }
  }

  async setLang(lang: string) {
    await Storage.set({key: 'lang', value: `${lang}`});
  }

  getPromotionalOffer(){
    this.promotionalService.getPromotionalOffer().subscribe((res) => {
      console.log('res',res);
      this.promotionalOfferList = res;
    }),
    error => {
      console.log('res',error);
  }
  }

  async logout() {
    // debugger
    this.logoutPayload.deviceName = this.deviceInfo.model;
    this.logoutPayload.deviceNumber = this.deviceId.uuid;
    this.logoutPayload.hardwareSignature = this.deviceId.uuid;
    this.logoutPayload.mobileAppVersion = this.deviceInfo.osVersion;
    this.logoutPayload.mobileAppVersionCode = 1;
    this.logoutPayload.requestId = await this.userManagerService.getRequestId();
    this.logoutPayload.sessionToken = await this.userManagerService.getSessionToken();

    console.log('global::', this.logoutPayload);
    this.loadingController
      .create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
      }).then((res) => res.present());
    this.userManagerService.logout(this.logoutPayload).subscribe(
      async (res) => {
        // debugger
        if (res.status === 200) {
          this.loadingController.dismiss().then();
          this.toastController.create({
            message: 'Logout Successfully',
            duration: 2000,
            color: 'success',
            position: 'bottom'
          }).then(async suc => {
            await suc.present();
          });
          console.log('Logout success');
          this.router.navigateByUrl('');
          await localStorage.clear();
        } else {
          console.log('error');
        }
      },
      error => {
        console.log(error);
      });
  }

  notFunctional(){
    this.toastController.create({
      message: 'Not Functional yet!',
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    }).then(async suc => {
      await suc.present();
    });
    console.log('Not Functional yet!');
    // this.router.navigateByUrl('');
  }



}

