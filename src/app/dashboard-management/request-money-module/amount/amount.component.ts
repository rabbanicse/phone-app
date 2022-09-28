import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss'],
})
export class AmountComponent implements OnInit {

  headerText = 'Request Money';

  constructor(private router: Router) { }

  ngOnInit() {}
  checkAmount(){
    this.router.navigateByUrl('dashboard/pay/payment-success');
  }

}
