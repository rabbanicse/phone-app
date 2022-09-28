import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Card } from '../../@model/Card';
import { RentStausUpdate } from '../../@model/rentStatusUpdate';
import { CardService } from '../../@service/card.service';
import { RentService } from '../../@service/rent.service';

@Component({
  selector: 'app-card-popup',
  templateUrl: './card-popup.component.html',
  styleUrls: ['./card-popup.component.scss'],
})
export class CardPopupComponent implements OnInit {
  headerText = 'Rent';
  cardPopupForm:FormGroup;
  submitted = false;  

  cardList$: Observable<Card[]>;

  creditCard: Card[] = [];
  debitCard:  Card[] = [];
  card:any;
  rentSlipObj:any;

  rentStatusUpdate:RentStausUpdate;

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private service: CardService,
    private rentService: RentService,
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
  this.router.navigateByUrl('/dashboard/rent/otp',{state:{rentSlipObj:this.rentSlipObj, card: this.card}});
  return this.modalCtrl.dismiss('sendToOTP');
}

//get f() { return this.cardPopupForm.controls; }

}
