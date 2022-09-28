import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bill-pay',
  templateUrl: './bill-pay.component.html',
  styleUrls: ['./bill-pay.component.scss'],
})
export class BillPayComponent implements OnInit {

  iconList = [
    '/assets/icon/credit_card.png',
    '/assets/icon/desco.png',
    '/assets/icon/mobile_recharge.png',
    '/assets/icon/credit_card.png',
    '/assets/icon/desco.png',
    '/assets/icon/mobile_recharge.png',
    '/assets/icon/credit_card.png',
    '/assets/icon/desco.png',
    '/assets/icon/mobile_recharge.png',
    '/assets/icon/credit_card.png',
    '/assets/icon/desco.png',
    '/assets/icon/mobile_recharge.png',
    '/assets/icon/credit_card.png',
    '/assets/icon/desco.png',
    '/assets/icon/mobile_recharge.png',
    '/assets/icon/credit_card.png',
    '/assets/icon/desco.png',
    '/assets/icon/mobile_recharge.png',
    '/assets/icon/credit_card.png',
    '/assets/icon/desco.png',
    '/assets/icon/mobile_recharge.png',
  ];

  constructor(public translate: TranslateService) {
    //this.setLanguage();
  }

  ngOnInit() {
  }


}
