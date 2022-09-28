import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Observable} from 'rxjs';
import { Card } from '../../@model/Card';
import { CardService } from '../../@service/card.service';
import { CardPopupComponent } from '../card-popup/card-popup.component';


@Component({
  selector: 'app-select-payment-card',
  templateUrl: './select-payment-card.component.html',
  styleUrls: ['./select-payment-card.component.scss'],
})
export class SelectPaymentCardComponent implements OnInit {
  headerText ='Send Money';
  cardList$: Observable<Card[]>;
  sendMoneyObj: any;
  creditCard: Card[] = [];
  debitCard:  Card[] = [];
  hintText = 'Select credit/debit card to pay from';


  constructor(private service: CardService, private modalCtrl: ModalController) {
    //this.setLanguage();
  }

  ngOnInit() {
    this.sendMoneyObj = history.state.sendMoneyObj;
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
        sendMoneyObj: this.sendMoneyObj
      }
    });
    modal.present();
  }

}
