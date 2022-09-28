import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Card } from '../../@model/Card';
import { CardService } from '../../@service/card.service';
import { CardPopupComponent } from '../card-popup/card-popup.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  headerText = 'Rent';
  cardList$: Observable<Card[]>;
  rentSlipObj:any;

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
    this.rentSlipObj = history.state.rentSlipObj;
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

  async openModal(item:any) {
    const modal = await this.modalCtrl.create({
      component: CardPopupComponent,
      cssClass: 'small-modal',
      componentProps: { 
        card: item,
        rentSlipObj:this.rentSlipObj
      }
    });
    modal.present();
  }
}
