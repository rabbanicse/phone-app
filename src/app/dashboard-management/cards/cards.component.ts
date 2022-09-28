import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CardService} from '../@service/card.service';
import {Observable} from 'rxjs';
import {Card} from '../@model/Card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  headerText = 'Card List';
  cardList$: Observable<Card[]>;

  creditCard: Card[] = [];
  debitCard:  Card[] = [];

  constructor(private service: CardService,private router: Router) {
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
    // const modal = await this.modalCtrl.create({
    //   component: Card03Component,
    // });
    // await modal.present();
    this.router.navigateByUrl(
      '/common/card03',
      {state:{
        card: item
      }});
  }

}
