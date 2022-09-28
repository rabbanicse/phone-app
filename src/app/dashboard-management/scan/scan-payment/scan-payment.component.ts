import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Card } from '../../@model/Card';
import { CardService } from '../../@service/card.service';
import { CardPopupComponent } from '../card-popup/card-popup.component';

@Component({
  selector: 'app-scan-payment',
  templateUrl: './scan-payment.component.html',
  styleUrls: ['./scan-payment.component.scss'],
})
export class ScanPaymentComponent implements OnInit {

  cardList$: Observable<Card[]>;

  creditCard: Card[] = [];
  debitCard:  Card[] = [];
  hintText = 'Select credit/debit card to pay from';

  constructor(private service: CardService, public translate: TranslateService, private modalCtrl: ModalController) {
    //this.setLanguage();
  }

  ngOnInit() {
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
      componentProps:{
        card: item,
      }
    });
    await modal.present();
  }

}
