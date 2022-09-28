import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-message',
  templateUrl: './payment-message.component.html',
  styleUrls: ['./payment-message.component.scss'],
})
export class PaymentMessageComponent implements OnInit {

  isShown = false;
  message = {title: '', desc: ''};


  constructor(public translate: TranslateService) {
    this.setLanguage();
  }

  ngOnInit() {
      this.message = history.state;
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
