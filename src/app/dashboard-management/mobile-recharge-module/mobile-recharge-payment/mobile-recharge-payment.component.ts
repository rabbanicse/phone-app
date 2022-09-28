import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Card } from '../../@model/Card';
import { CardService } from '../../@service/card.service';
import { CardPopupComponent } from '../card-popup/card-popup.component';

@Component({
  selector: 'app-mobile-recharge-payment',
  templateUrl: './mobile-recharge-payment.component.html',
  styleUrls: ['./mobile-recharge-payment.component.scss'],
})
export class MobileRechargePaymentComponent implements OnInit {

  headerText = 'Mobile Recharge';
  cardList$: Observable<Card[]>;
  mobileRechargeObj: any;
  creditCard: Card[] = [];
  debitCard:  Card[] = [];
  hintText = 'Select credit/debit card to pay from';

  constructor(private service: CardService, public translate: TranslateService, private modalCtrl: ModalController) {
    //this.setLanguage();
  }

  ngOnInit() {
    this.mobileRechargeObj = history.state.mobileRechargeObj;
    this.getList();
    this.service.aClickedEvent
      .subscribe((data: string) => {
        this.getList();
        console.log('Event message from Component A: ' + data);
      });
  }

  getList() {
    this.service.getCardbyPhone().subscribe(res => {
      res.map(data => {
        if (data.cardType === 'debit') {
          this.debitCard.push(data);
        } else if (data.cardType === 'credit') {
          this.creditCard.push(data);
        }
      });
    });

  }

  async openModal(item: any) {
    const modal = await this.modalCtrl.create({
      component: CardPopupComponent,
      cssClass: 'small-modal',
      componentProps: {
        card: item,
        mobileRechargeObj:this.mobileRechargeObj
      }
    });
    await modal.present();
  }
}
