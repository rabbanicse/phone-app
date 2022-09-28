import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Card } from '../../@model/Card';
import { CardService } from '../../@service/card.service';

@Component({
  selector: 'app-pay-to-select-card',
  templateUrl: './pay-to-select-card.component.html',
  styleUrls: ['./pay-to-select-card.component.scss'],
})
export class PayToSelectCardComponent implements OnInit {
  headerText = 'Credit Card Bill Pay';
  cardList$: Observable<Card[]>;
  public card: any;
  creditCard: Card[] = [];
  hintText = 'Select credit/debit card to pay from';

  constructor(
    private service: CardService,
    private router: Router,
    // private navCtrl: NavController,
    // private modalCtrl: ModalController,
    // private popoverCtrl: PopoverController
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
        if (data.cardType === 'credit') {
          this.creditCard.push(data);
        }
      });
    });

  }

  selectCard(payToCard) {
    console.log('Pay To child::',payToCard);
     this.router.navigate(['/dashboard/bill-pay/credit-card', {payToCard: JSON.stringify(payToCard)}]);
  }

  // async openModal() {
  //   // const modal = await this.modalCtrl.create({
  //   //   component: CardPopupComponent,
  //   //   cssClass: 'small-modal'
  //   // });
  //   // await modal.present();
  //   this.router.navigateByUrl('/dashboard/bill-pay/credit-card');
  // }
}
