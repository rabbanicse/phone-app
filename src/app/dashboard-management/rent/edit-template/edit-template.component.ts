import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Template } from '../../@model/template';
import { Storage } from '@capacitor/storage';
import { TemplateService } from '../../@service/template.service';
import { MonthsNumber } from 'src/app/utility/enums/enum';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss'],
})
export class EditTemplateComponent implements OnInit {
  headerText = 'Rent';
  isSubmitted = false;
  rentForm: FormGroup;
  templateObj: Template = {
    id: 0,
    templateName: '',
    ownerId: '',
    year: 0,
    month: 0,
    monthName: '',
    rent: 0,
    waterBill: 0,
    gasBill: 0,
    electricBill: 0,
    serviceCharge: 0,
    others: 0,
    totalRent: 0,
  };

  monthsNumber: any[];

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private templateService: TemplateService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.templateObj.id = this.activatedRoute.snapshot.params.id;
    //this.loadFromData();
    this.initFormGroup();

    if (this.templateObj.id != undefined) {
      this.getTemplateDetails();
    }
    this.monthsNumber = MonthsNumber;
    console.log('monthsNumber', this.monthsNumber);
    //this.templateSaveOrUpdate();
  }

  loadFromData() {
    if (this.templateObj.id == undefined) {
      this.initFormGroup();
    } else {
      this.getTemplateDetails();
    }
  }

  initFormGroup() {
    this.rentForm = this.fb.group({
      templateName: new FormControl('', Validators.required),
      //ownerId: new FormControl('', Validators.required),
      year: new FormControl(0, Validators.required),
      month: new FormControl(0, Validators.required),
      monthName: new FormControl('', Validators.required),
      rent: new FormControl(0, Validators.required),
      waterBill: new FormControl(0, Validators.required),
      gasBill: new FormControl(0, Validators.required),
      electricBill: new FormControl(0, Validators.required),
      serviceCharge: new FormControl(0, Validators.required),
      others: new FormControl(0, Validators.required),
      totalRent: 0,
    });
  }
  async templateSave() {
    const { value } = await Storage.get({ key: 'phoneNo' });
    if(this.rentForm.invalid){
      return;
    }
    console.log('check phone no', value);

    this.templateObj = {
      id: 0,
      templateName: this.rentForm.value.templateName,
      ownerId: value,
      year: this.rentForm.value.year,
      month: this.rentForm.value.month,
      monthName: this.rentForm.value.monthName,
      rent: this.rentForm.value.rent,
      waterBill: Number(this.rentForm.value.waterBill),
      gasBill: Number(this.rentForm.value.gasBill),
      electricBill: Number(this.rentForm.value.electricBill),
      serviceCharge: Number(this.rentForm.value.serviceCharge),
      others: Number(this.rentForm.value.others),
      totalRent: 0,
    };
      this.templateService.createTemplate(this.templateObj).subscribe((res) => {
        console.log('res',res);
        this.router.navigateByUrl('/dashboard/rent/rent-preview',{state:{template:res}});
      }),
      error => {
        console.log('res',error);
    }
    console.log('createTemplateObj', this.templateObj);
  }

  async templateUpdate() {
    const { value } = await Storage.get({ key: 'phoneNo' });
    this.templateObj = {
      id: this.templateObj.id,
      templateName: this.rentForm.value.templateName,
      ownerId: value,
      year: this.rentForm.value.year,
      month: this.rentForm.value.month,
      monthName: this.rentForm.value.monthName,
      rent: this.rentForm.value.rent,
      waterBill: Number(this.rentForm.value.waterBill),
      gasBill: Number(this.rentForm.value.gasBill),
      electricBill: Number(this.rentForm.value.electricBill),
      serviceCharge: Number(this.rentForm.value.serviceCharge),
      others: Number(this.rentForm.value.others),
      totalRent: Number(this.rentForm.value.totalRent),
    };
    this.templateService.createTemplate(this.templateObj).subscribe((res) => {
      console.log('res', res);
      this.router.navigateByUrl('/dashboard/rent/rent-preview',{state:{template:res}});
    }),
      (error) => {
        console.log('res', error);
      };
  }

  getTemplateDetails() {
    this.templateService
      .getTemplateDetails(this.templateObj.id)
      .subscribe((res) => {
        console.log('res', res);
        this.rentForm = this.fb.group({
          templateName: res.templateName,
          //ownerId: res.ownerId,
          year: res.year,
          month: res.month,
          monthName: res.monthName,
          rent: res.rent,
          waterBill: res.waterBill,
          gasBill: res.gasBill,
          electricBill: res.electricBill,
          serviceCharge: res.serviceCharge,
          others: res.others,
          totalRent: res.totalRent,
        });
        // this.router.navigateByUrl('/dashboard/rent/rent-preview',{state:{template:res}});
      }),
      (error) => {
        console.log('res', error);
      };
  }

  templateSaveOrUpdate() {
    this.isSubmitted = true;
    if (this.templateObj.id == undefined || this.templateObj.id == 0 || this.templateObj.id == null) {
      this.templateSave();
    } else {
      this.templateUpdate();
    }
  }

  getMonthValue(event) {
    //this.rentForm.value.month = Number(event.target.value);
    this.rentForm.value.monthName = event.target.value;
    console.log('monthEvent', this.rentForm.value.monthName);
    console.log(typeof this.rentForm.value.monthName);
    var item = this.monthsNumber.find(
      (x) => x.monthName == this.rentForm.value.monthName
    );
    this.rentForm.patchValue({
      month: Number(item.month),
    });
  }
}
