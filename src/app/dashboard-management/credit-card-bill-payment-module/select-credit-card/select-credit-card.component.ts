import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Card } from '../../@model/Card';
import { CardService } from '../../@service/card.service';
import {Location} from '@angular/common';

@Injectable()
export class CardSelectedService {
    public cardSelected: any = [];
}

@Component({
  selector: 'app-select-credit-card',
  templateUrl: './select-credit-card.component.html',
  styleUrls: ['./select-credit-card.component.scss'],
})
export class SelectCreditCardComponent implements OnInit {
  cardList$: Observable<Card[]>;
  public card: any;
  creditCard: Card[] = [];
  debitCard:  Card[] = [];
  hintText = 'Select credit/debit card to pay from';

  constructor(
    private service: CardService,
    private router: Router,
    private navCtrl: NavController,
    private location: Location,
    private popoverCtrl: PopoverController,
    private cardSelectedService: CardSelectedService
    ) {
    //this.setLanguage();
  }

  ngOnInit() {
    this.getList();
    this.service.aClickedEvent
      .subscribe((data: string) => {
        this.getList();
        console.log('Event message from Component A: ' + data);
      });
    // this.openModal();
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

  selectCard(card) {
    // this.payFrom.push(card);
    // this.cardSelectedService.cardSelected = card;
    // console.log('child::',this.cardSelectedService.cardSelected);
    console.log('child::',card);
     this.router.navigate(['/dashboard/bill-pay/credit-card', {card: JSON.stringify(card)}]);
  }
}
