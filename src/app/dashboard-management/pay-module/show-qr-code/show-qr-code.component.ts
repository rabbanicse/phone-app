import { Card } from 'src/app/dashboard-management/@model/Card';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardService } from '../../@service/card.service';

@Component({
  selector: 'app-show-qr-code',
  templateUrl: './show-qr-code.component.html',
  styleUrls: ['./show-qr-code.component.scss'],
})
export class ShowQrCodeComponent implements OnInit {
  headerText ='Pay';
  card: Card;
  cardList$: Observable<Card[]>;
  creditCard: Card[] = [];
  constructor(private service: CardService) {
    //this.setLanguage();
  }

  ngOnInit() {
    this.card = history.state.card;
    console.log('card data Qr Code', this.card);
    // this.getList();
    // this.service.aClickedEvent
    //   .subscribe((data: string) => {
    //     this.getList();
    //     console.log('Event message from Component A: ' + data);
    //   });
  }

  getList() {
    this.service.getCardbyPhone().subscribe(res => {
      res.map(data => {
        if (data.cardType === 'debit') {
          this.creditCard.push(data);
        } else if (data.cardType === 'credit') {
          this.creditCard.push(data);
        }
      });
    });

  }

}
