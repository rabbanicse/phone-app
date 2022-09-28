import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Card } from '../../@model/Card';

@Component({
  selector: 'app-card-popup',
  templateUrl: './card-popup.component.html',
  styleUrls: ['./card-popup.component.scss'],
})
export class CardPopupComponent implements OnInit {
  card: Card;
  cardPopupForm: FormGroup;
  submitted = false;
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private fb: FormBuilder,
    public translate: TranslateService
    ) {
    // this.card = history.state.card;

  }

  ngOnInit() {
    console.log(this.card);
    this.initFormGroup();
  }

  confirm() {
    this.router.navigateByUrl('/scan-otp');
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
    this.router.navigateByUrl('/scan-otp');
    return this.modalCtrl.dismiss('sendToOTP');
  }
}
