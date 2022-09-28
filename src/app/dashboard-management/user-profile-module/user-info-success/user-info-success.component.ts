import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-user-info-success',
  templateUrl: './user-info-success.component.html',
  styleUrls: ['./user-info-success.component.scss'],
})
export class UserInfoSuccessComponent implements OnInit {
  headerText = 'User Profile';
  isShown = false;
  message = {title: '', desc: ''};


  constructor(public translate: TranslateService) {
    this.setLanguage();
  }

  ngOnInit() {
    this.message.title = 'Congratulations!';
    this.message.desc = 'User Info Updated!';
  }


  setLanguage() {
    if (localStorage.getItem('language') === null || localStorage.getItem('language') === 'null') {
      this.translate.addLangs(['English', 'Bangla']);
      this.translate.setDefaultLang('English');
    } else {
      this.translate.addLangs(['English', 'Bangla']);
      const object = localStorage.getItem('language');
      this.translate.setDefaultLang(object);
    }
  }

  toggleShow(){
    this.isShown = !this.isShown;
  }


}
