import { Component, OnInit } from '@angular/core';
import { RentService } from '../../@service/rent.service';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { RentSlipList } from '../../@model/rentSlipList';
import { UserManagerService } from 'src/app/user-management/@service/user-manager.service';
import { Device, DeviceInfo } from '@capacitor/device';
import { UserProfileInfo } from 'src/app/user-management/@model/UserProfileInfo';
import { Platform } from '@ionic/angular';
import { MonthsNumber } from 'src/app/utility/enums/enum';

@Component({
  selector: 'app-tenant-slip',
  templateUrl: './tenant-slip.component.html',
  styleUrls: ['./tenant-slip.component.scss'],
})
export class TenantSlipComponent implements OnInit {
  headerText = 'Rent';
  rentSlipList: RentSlipList[] = [];
  userdata = {};
  monthsNumber: any[];
  monthName: any;
  rentSlip:any;

  constructor(
    private rentService: RentService,
    private router: Router,
    private userManagerService: UserManagerService,
    private plt: Platform
  ) {}

  async ngOnInit() {
    this.rentSlip = history.state.rentSlip;
    await this.getUserInfoFromLocalStorage();
    this.getRentSlipList();
    this.monthsNumber = MonthsNumber;
  }

  async getRentSlipList() {
    const { value } = await Storage.get({ key: 'phoneNo' });

    this.rentService.getRentSlipList(value).subscribe((res) => {
      this.rentSlipList = res;
      console.log('rentSlipList', res);

      this.rentSlipList.forEach((element, index) => {
        var item = this.monthsNumber.find((x) => x.month == element.month);
        this.rentSlipList[index].monthName = item.monthName;
      });
      //this.router.navigateByUrl('/dashboard/rent/rent-preview',{state:{template:res}});
    }),
      (error) => {
        console.log('res', error);
      };
  }

  async getUserInfoFromLocalStorage() {
    this.userManagerService.getUserInfo().then((res) => {
      this.userdata = res;
      console.log(this.userdata);
    });
  }

  goToTenantPreview(item) {
    this.router.navigateByUrl('/dashboard/rent/tenant-preview', {
      state: { item: item, rentSlip: this.rentSlip },
    });
  }
}
