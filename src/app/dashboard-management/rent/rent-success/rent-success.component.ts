import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-success',
  templateUrl: './rent-success.component.html',
  styleUrls: ['./rent-success.component.scss'],
})
export class RentSuccessComponent implements OnInit {
  isShown = false;
  message = {title: 'Rent Slip Successfully Paid', desc: 'Congratulation! operation successfuly'};
  constructor(public router: Router,) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigateByUrl('/dashboard');
     }, 3000);
  }

}
