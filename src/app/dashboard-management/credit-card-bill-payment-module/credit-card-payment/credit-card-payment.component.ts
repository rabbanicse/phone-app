import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-credit-card-payment',
  templateUrl: './credit-card-payment.component.html',
  styleUrls: ['./credit-card-payment.component.scss'],
})
export class CreditCardPaymentComponent implements OnInit {
  headerText = 'Credit Card Bill Pay';

  constructor(protected readonly modalController: ModalController) { }

  ngOnInit() {}
  dismiss() {
    this.modalController.dismiss();
  }

}
