import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-rent-page',
  templateUrl: './rent-page.component.html',
  styleUrls: ['./rent-page.component.scss'],
})
export class RentPageComponent implements OnInit {
  headerText = 'Rent';
  isSubmitted = false;
  constructor(private router: Router) { }

  ngOnInit() {}

  goToTenantPageRentSlip(){
    this.router.navigateByUrl('/dashboard/rent/tenant-slip', {state: {rentSlip: this.isSubmitted}});
  }

  goToTenantPageTenantSlip(){
    this.router.navigateByUrl('/dashboard/rent/tenant-slip', {state: {rentSlip: !this.isSubmitted}});
  }

}
