import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { Card } from 'src/app/dashboard-management/@model/Card';
import { CardService } from 'src/app/dashboard-management/@service/card.service';
import { CardPopupComponent } from '../card-popup/card-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  cardList$: Observable<Card[]>;

  creditCard: Card[] = [];
  debitCard:  Card[] = [];
  hintText = 'Select credit/debit card to pay from';

  constructor(
    private service: CardService,
    private router: Router,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController
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

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CardPopupComponent,
      cssClass: 'small-modal'
    });
    modal.present();
  }



}
