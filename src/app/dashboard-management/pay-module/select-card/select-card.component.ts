import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Card } from '../../@model/Card';
import { CardService } from '../../@service/card.service';
import { CardPopupComponent } from '../card-popup/card-popup.component';

@Component({
  selector: 'app-select-card',
  templateUrl: './select-card.component.html',
  styleUrls: ['./select-card.component.scss'],
})
export class SelectCardComponent implements OnInit {
  headerText = 'Pay';
  cardList$: Observable<Card[]>;

  creditCard: Card[] = [];
  debitCard: Card[] = [];
  hintText = 'Select credit/debit card to pay from';

  constructor(private service: CardService, private modalCtrl: ModalController, private router: Router) {
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

  selectCard(item: any) {
    console.log('card data',item);
    this.router.navigateByUrl(
      'show-qr-code',
      {
        state: {card:item}
      });
  }

}
