import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-send-money-success',
  templateUrl: './send-money-success.component.html',
  styleUrls: ['./send-money-success.component.scss'],
})
export class SendMoneySuccessComponent implements OnInit {
  isShown = false;
  message = {
    title: 'Payment Success',
    desc: 'Congratulation! you have successfuly pay from credit card',
  };

  constructor(public translate: TranslateService) {
    this.setLanguage();
  }

  ngOnInit() {
    // this.message = history.state;
  }

  setLanguage() {
    if (
      localStorage.getItem('language') === null ||
      localStorage.getItem('language') === 'null'
    ) {
      this.translate.addLangs(['English', 'Bangla']);
      this.translate.setDefaultLang('English');
    } else {
      this.translate.addLangs(['English', 'Bangla']);
      const object = localStorage.getItem('language');
      this.translate.setDefaultLang(object);
    }
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }
}
