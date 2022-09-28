import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromotionalOffer } from '../@model/promotionalOffer';
import { PromotionalOfferService } from '../@service/promotional-offer.service';

@Component({
  selector: 'app-promotional-offer',
  templateUrl: './promotional-offer.component.html',
  styleUrls: ['./promotional-offer.component.scss'],
})
export class PromotionalOfferComponent implements OnInit {
  headerText = 'Promotional Offer';

  public promotionalOfferList:PromotionalOffer[] = [];

  constructor(private promotionalService: PromotionalOfferService, private router: Router) { }

  ngOnInit() {
    this.getPromotionalOffer();
  }

  getPromotionalOffer(){
    this.promotionalService.getPromotionalOffer().subscribe((res) => {
      console.log('res',res);
      debugger;
    }),
    error => {
      console.log('res',error);
      debugger;
  }
  }
}
