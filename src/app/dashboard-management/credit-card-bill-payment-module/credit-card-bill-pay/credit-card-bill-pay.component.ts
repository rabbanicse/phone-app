import { CardSelectedService } from './../select-credit-card/select-credit-card.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { SelectCreditCardComponent } from '../select-credit-card/select-credit-card.component';

@Component({
  selector: 'app-credit-card-bill-pay',
  templateUrl: './credit-card-bill-pay.component.html',
  styleUrls: ['./credit-card-bill-pay.component.scss'],
})
export class CreditCardBillPayComponent implements OnInit {
  headerText = 'Credit Card Bill Pay';
  payFromCard: any;
  payToCard: any;

  card1: any;
  card2: any;

  constructor(
    public translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private cardSelectedService: CardSelectedService,
  ) {
    // this.payFromCard= this.activatedRoute.snapshot.params['card'];
    // this.payToCard= this.activatedRoute.snapshot.params['payToCard'];
  }

  ngOnInit() {
    //this.payFromCard= this.activatedRoute.snapshot.params['card'];
    this.payToCard= this.activatedRoute.snapshot.params['payToCard'];

        // if (this.payFromCard !=undefined ){
        //   this.payFromCard = JSON.parse(this.payFromCard);
        //   console.log('rahi', this.payFromCard);
        // }

        if (this.payToCard !=undefined ){
          this.payToCard = JSON.parse(this.payToCard);
          console.log('rahi11', this.payToCard);
        }


  }


  payFromModal() {
    this.router.navigateByUrl('/dashboard/bill-pay/select-credit-card');
  };
  payToModal() {
    this.router.navigateByUrl('/dashboard/bill-pay/pay-to-select-card');
  };

}
