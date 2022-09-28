import {Component, OnInit} from '@angular/core';
import {CardService} from '../@service/card.service';
import {Card} from '../@model/Card';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Storage} from '@capacitor/storage';
import {FormType} from '../../utility/enums/enum';
import { Card03Component } from 'src/app/shared-module/card03/card03.component';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent implements OnInit {
  headerText = 'Add Card';

  card: Card;
  cardForm: FormGroup;
  cardList$: Observable<Card[]>;
  isSubmitted = false;
  isChecked = false;


  constructor(private service: CardService,
              public toastController: ToastController,
              private router: Router) {

  }

  ngOnInit() {
    this.getList();
    this.initFormGroup();
  }

  initFormGroup() {
    this.cardForm = new FormGroup({
      cardType: new FormControl('', Validators.required),
      cardNumber: new FormControl('', Validators.required),
      cardName: new FormControl('', Validators.required),
      billingDate: new FormControl('', Validators.required),
      // monthYear: new FormControl('', Validators.required),
      expiryDate: new FormControl('', Validators.required),
      companyCardType: new FormControl('', Validators.required),
      cvv: new FormControl('', Validators.required),
      acceptTerms: new FormControl('', Validators.required),
    });
  }

  getList() {
    this.cardList$ = this.service.getCardList();
  }

  async onSubmit() {
    this.isSubmitted = true;
    const {value} = await Storage.get({key: 'phoneNo'});

    if (this.cardForm.valid) {
      this.card = {
        cardNumber: this.cardForm.value.cardNumber,
        cardType: this.cardForm.value.cardType,
        cardName: this.cardForm.value.cardName,
        expiryDate: this.cardForm.value.expiryDate,
        billingDate: this.cardForm.value.billingDate,
        // monthYear: this.cardForm.value.monthYear,
        companyCardType: this.cardForm.value.companyCardType,
        cvv: this.cardForm.value.cvv,
        phoneNo: value
      };
      this.router.navigateByUrl('/common/otp', {state: {data: this.card, type: FormType.card}});
    }
  }

  checkboxClick($event: any) {
    if ($event.target.checked) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }
}
