import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentSlipList } from '../../@model/rentSlipList';
import { RentService } from '../../@service/rent.service';
import { Storage } from '@capacitor/storage';
import { RentSlipDetails } from '../../@model/rentSlipDetails';
import { MonthsNumber } from 'src/app/utility/enums/enum';

@Component({
  selector: 'app-tenant-preview',
  templateUrl: './tenant-preview.component.html',
  styleUrls: ['./tenant-preview.component.scss'],
})
export class TenantPreviewComponent implements OnInit {
  headerText = 'Rent';
  tenantItem: any;
  rentSlipObj: RentSlipDetails = {
    id: 0,
    year: 0,
    month: 0,
    templateName: '',
    rent: 0,
    waterBill: 0,
    gasBill: 0,
    electricBill: 0,
    others: 0,
    serviceCharge: 0,
    totalRent: 0,
  };
  monthsNumber: any[];
  monthName: any[];
  rentSlip:any;

  constructor(
    private rentService: RentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.rentSlip = history.state.rentSlip; 
    this.tenantItem = history.state.item;
    this.rentSlipObj.id = this.activatedRoute.snapshot.params.id;
    this.getRentSlipDetails();
  }

  async getRentSlipDetails() {
    const { value } = await Storage.get({ key: 'phoneNo' });

    this.rentService
      .getRentSlipDetails(value, this.tenantItem.id)
      .subscribe((res) => {
        this.rentSlipObj = res;
        console.log('rentSlipList', res);
      }),
      (error) => {
        console.log('res', error);
      };
  }

  payNow() {
    this.router.navigateByUrl('/dashboard/rent/card-list', {
      state: { rentSlipObj: this.tenantItem },
    });
  }
}
