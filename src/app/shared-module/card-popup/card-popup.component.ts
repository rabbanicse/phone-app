import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-card-popup',
  templateUrl: './card-popup.component.html',
  styleUrls: ['./card-popup.component.scss'],
})
export class CardPopupComponent implements OnInit {

  constructor(private modalCtrl: ModalController,private router: Router,) { }

  ngOnInit() {}

  confirm() {
    this.router.navigateByUrl('/common/otp');
    return this.modalCtrl.dismiss('confirm');
  }

}
