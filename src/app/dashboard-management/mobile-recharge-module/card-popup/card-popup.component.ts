import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Card } from '../../@model/Card';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-popup',
  templateUrl: './card-popup.component.html',
  styleUrls: ['./card-popup.component.scss'],
})
export class CardPopupComponent implements OnInit {
  cardPopupForm: FormGroup;
  submitted = false;

  cardList$: Observable<Card[]>;

  creditCard: Card[] = [];
  debitCard:  Card[] = [];
  card: any;
  mobileRechargeObj: any;


  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private fb: FormBuilder,
    public translate: TranslateService
    ) { }

  ngOnInit() {
    console.log('card data', this.card);
    this.initFormGroup();
  }
  confirm() {
    this.router.navigateByUrl('/dashboard/rent/otp');
    return this.modalCtrl.dismiss('confirm');

  }
  initFormGroup() {
    this.cardPopupForm = this.fb.group({
      acceptTerms: new FormControl (false, Validators.requiredTrue)
    });
  }

sendToOTP(){
  this.submitted = true;
  if (this.cardPopupForm.invalid) {
    return;
}
  this.router.navigateByUrl('/dashboard/recharge/mobile-recharge-otp',{state:{mobileRechargeObj:this.mobileRechargeObj, card: this.card}});
  return this.modalCtrl.dismiss('sendToOTP');
}


}


