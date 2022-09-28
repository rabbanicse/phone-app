import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../user-management/@model/Customer';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Device, DeviceInfo } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserManagerService } from '../../../user-management/@service/user-manager.service';
import { AppUtils } from '../../../utility/AppUtils';
import { FormType } from '../../../utility/enums/enum';


interface CustomerDetails {
  nidName: string;
  dateOfBirth: string;
  phoneNO: string;
  email: string;
  nidNo: string;
  // mothersName: string;
  // fathersName: string;
  // address: string;
  // district: string;
}

@Component({
  selector: 'app-user-update-nid-details',
  templateUrl: './user-update-nid-details.component.html',
  styleUrls: ['./user-update-nid-details.component.scss'],
})
export class UserUpdateNidDetailsComponent implements OnInit {
  headerText = 'Update Profile';
  customerDetails = {} as CustomerDetails;
  customer = {} as Customer;
  nidScanDetailsForm!: FormGroup;
  nidList$: Observable<Customer[]>;
  isSubmitted = false;
  userInfo$: any;
  deviceInfo: DeviceInfo = {} as DeviceInfo;
  deviceId: any;

  errors: any[] = [];
  fontSideNidImageBae64 = '';
  backSideNidImageBase64 = '';
  profileImage = '';

  constructor(
    private fb: FormBuilder,
    public translate: TranslateService,
    public router: Router,
    public toastController: ToastController,
    private userService: UserManagerService,
    public loadingController: LoadingController) {
      //Get userInfo data from localStorage
    this.userService.getUserInfo().then(data => {
      this.userInfo$ = data;
      console.log(data);
    });
    this.initFormGroup();
    // this.setLanguage();
  }

  async ngOnInit() {

    this.deviceId = await Device.getId();
    this.deviceInfo = await Device.getInfo();

    console.log(history.state);

    // this.getData();
    // this.phoneNo = history.state.checkPhoneStatus?.mobileNumber || '';

    // customerDetails has nid, name and DOB
    this.customerDetails.nidName = history.state.ocrData?.name || '';
    this.customerDetails.dateOfBirth = history.state.ocrData?.dateOfBirth || '';
    this.customerDetails.nidNo = history.state.ocrData?.nid || '';
    this.customerDetails.phoneNO = this.userInfo$.data.mobileNo || '';
    this.customerDetails.email = this.userInfo$.data.email || '';
    console.log(this.customerDetails);
    console.log(this.userInfo$.data.mobileNo);
    // this.customer.mobileNumber = history.state.checkPhoneStatus?.mobileNumber || '';


    //nid
    this.fontSideNidImageBae64 = history.state.frontSideImage64base || '';
    this.backSideNidImageBase64 = history.state.backSideImage64base || '';
    // this.profileImage = history.state.profileImage64Base || '';

    if (history.state.ocrData?.dateOfBirth !== undefined) {
      const splitDateFormat = history.state.ocrData.dateOfBirth.split(' ');
      this.customer.dateOfBirth = splitDateFormat[2] + '-' + splitDateFormat[1] + '-' + splitDateFormat[0] || '';
    }

  }

  initFormGroup() {
    this.nidScanDetailsForm = this.fb.group({
      nidName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      nidNo: ['', [Validators.required]],
      fathersName: ['', [Validators.required]],
      mothersName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      district: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
    });
  }


  // onSubmit1() {
  //   this.router.navigateByUrl('/dashboard/user-info/user-info-success', {});
  // }

  onSubmit() {
    this.isSubmitted = true;

    this.customer = {
      ...this.customer,
      customerName: this.nidScanDetailsForm.value.nidName,
      dateOfBirth: this.nidScanDetailsForm.value.dateOfBirth,
      mobileNumber: this.nidScanDetailsForm.value.phoneNo,
      fatherName: this.nidScanDetailsForm.value.fathersName,
      motherName: this.nidScanDetailsForm.value.mothersName,
      email: this.nidScanDetailsForm.value.email,
      requestId: AppUtils.generateId(16),
      hardwareSignature: this.deviceId.uuid,
      // profilePicture: this.profileImage,
      nidObject: {
        ...this.customer.nidObject,
        nid: this.nidScanDetailsForm.value.nidNo,
        nidImageFirstPage: this.fontSideNidImageBae64,
        nidImageSecondPage: this.backSideNidImageBase64
      }
    };

    console.log(this.nidScanDetailsForm.value.dateOfBirth);

    console.log(this.customer);
    // eslint-disable-next-line guard-for-in
    // for (const i in this.nidScanDetailsForm.controls) {
    //   this.nidScanDetailsForm.controls[i].markAsDirty();
    //   this.nidScanDetailsForm.controls[i].updateValueAndValidity();
    // }
    if (this.nidScanDetailsForm.valid) {
      this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
      }).then(res => res.present());

      this.userService.updateUserNidBothDocument(this.customer)
        .subscribe(
          res => {
            this.loadingController.dismiss();
            const data = res.data;
            this.router.navigateByUrl('/dashboard/user-info/user-info-success', {
              state: {
                resData: data,
                customer: this.customer,
                type: FormType.registration
              }
            });
          },
          err => {
            this.loadingController.dismiss();
            this.toastController.create({
              message: `${err.error.error.message}`,
              duration: 2000,
              color: 'danger',
              position: 'top'
            }).then(async suc => {
              await suc.present();
            }
            );
          });
    } else {
      //this.getFormValidationErrors();
      // this.toastController.create({
      //   message: `<div> ${this.errors} </div>`,
      //   duration: 4000,
      //   color: 'danger',
      //   position: 'middle'
      // }).then(async suc => {
      //     this.errors = [];
      //     await suc.present();
      //   }
      // );
    }

  }


  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  getFormValidationErrors() {

    Object.keys(this.nidScanDetailsForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.nidScanDetailsForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {

          const error = `<div> field: ${key}, Error: ${keyError} </div>`;

          this.errors.push(error);

          console.log('Field: ' + key + ', error: ' + keyError);
        });
      }
    });

    // console.log('Number of errors: ' ,totalErrors);
  }

  getData() {
    this.customer = {
      clientType: 'softbyte-customer-wallet',
      customerName: 'Afzalur Rashid',
      dateOfBirth: '19/05/2004',
      districtCode: '401',
      email: 'afzalur.rashid+65432@gmail.com',
      estimatedMonthlyIncomeCode: '01',
      fatherName: 'afsar',
      fileTypeProfilePicture: 'jpg',
      gender: 'M',
      mobileNumber: '01677759373',
      motherName: 'tahmina',
      nidObject: {
        fileTypeFirstPage: 'jpg',
        fileTypeSecondPage: 'jpg',
        nid: '222222',
        nidHMac: 'uV4erA+WVSRxpNutMQhZJDSciUEGTXEDwnG7VNU75zQ=',
        nidImageFirstPage: '',
        nidImageSecondPage: ''
      },
      occupationCode: '01',
      operatorCode: '2',
      permanentAddress: 'hhvcv',
      pin: '4321',
      presentAddress: 'hhvcv',
      profilePicture: '',
      profitAccountType: 'PROFIT_ACCOUNT',
      referralCode: '',
      sourceOfIncomeCode: '01',
      unionCode: 'P001791',
      upazilaCode: 'U000198',
      userType: '5',
      deviceName: 'samsung SM-G610F Android 8.1.0',
      deviceNumber: 'a9eeec9c7c67a2eb',
      hardwareSignature: '',
      mobileAppVersion: '2.3.1_IW_DEMO',
      mobileAppVersionCode: 50,
      requestId: 'D9ADE02643684E6A',
      sessionToken: ''
    };
  }


}
