import {Component, OnInit, Renderer2} from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { UserManagerService } from '../../../user-management/@service/user-manager.service';
import { Logout } from 'src/app/user-management/@model/logout';
import { Device } from '@capacitor/device';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { LoadingController, ToastController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-user-oveview',
  templateUrl: './user-oveview.component.html',
  styleUrls: ['./user-oveview.component.scss'],
})
export class UserOveviewComponent implements OnInit {
  headerText = 'User Overview';
  imageData: SafeResourceUrl;
  userdata = {};

  constructor(
    private router: Router,
    private userManagerService: UserManagerService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public translate: TranslateService,
    private renderer2: Renderer2
  ) { }

  async ngOnInit() {
    await this.getUserInfoFromLocalStorage();
    await this.getProfileImage();
  }


  async getUserInfoFromLocalStorage() {
    this.userManagerService.getUserInfo()
      .then(res => {
        this.userdata = res;
        console.log(this.userdata);
      });
  }

  async getProfileImage() {
    const payload = {
      fileName: await this.userManagerService.getProfilePicture()
    };

    this.userManagerService.getProfileImage(payload)
      .subscribe(res => {
        console.log(res);
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onloadend = () => {
          this.imageData = reader.result;
        };
      }, error => {
        // console.log('aaaaaaaaaaaaaa');
        console.log(error);
      });
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


}
