import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Customer} from '../@model/Customer';
import {FormType} from '../../utility/enums/enum';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Storage} from '@capacitor/storage';
import {UserManagerService} from '../@service/user-manager.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {Device, DeviceInfo} from '@capacitor/device';
import {AppUtils} from '../../utility/AppUtils';


interface CustomerDetails {
  nidName: string;
  dateOfBirth: string;
  nidNo: string;
  fathersName: string;
  mothersName: string;
  email: string;
  address: string;
  district: string;
  password: string;
  confirmPassword: string;
  phoneNO: string;
}

@Component({
  selector: 'app-nid-scanner-details',
  templateUrl: './nid-scanner-details.component.html',
  styleUrls: ['./nid-scanner-details.component.scss'],
})
export class NidScannerDetailsComponent implements OnInit {
  headerText = 'Registration';
  customerDetails = {} as CustomerDetails;
  customer = {} as Customer;
  nidScanDetailsForm!: FormGroup;
  nidList$: Observable<Customer[]>;
  isSubmitted = false;
  phoneNo = '';

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
    this.initFormGroup();
    this.setLanguage();
  }
  async setLanguage() {
    if (localStorage.getItem('language') === null || localStorage.getItem('language') === 'null') {
      this.translate.addLangs(['English', 'Bangla']);
      this.translate.setDefaultLang('English');
    } else {
      this.translate.addLangs(['English', 'Bangla']);
      const object = localStorage.getItem('language');
      this.translate.setDefaultLang(object);
    }
  }

  async ngOnInit() {

    this.deviceId = await Device.getId();
    this.deviceInfo = await Device.getInfo();

    console.log('nid data:',history.state);
    this.getData();
    //this.phoneNo = history.state.checkPhoneStatus?.mobileNumber || '';
    this.phoneNo = history.state.checkPhoneStatus.mobileNumber;


    this.customerDetails.nidNo = history.state.ocrData?.nid || '';
    this.customerDetails.nidNo = history.state.ocrData?.nid || '';
    this.customerDetails.nidName = history.state.ocrData?.name || '';
    this.customerDetails.dateOfBirth = history.state.ocrData?.dateOfBirth || '';
    this.customerDetails.phoneNO = this.phoneNo;
    console.log(this.customer);
    console.log(this.customerDetails.dateOfBirth);
    this.customer.mobileNumber = history.state.checkPhoneStatus?.mobileNumber || '';


    //nid
    this.fontSideNidImageBae64 = history.state.frontSideImage64base || '';
    this.backSideNidImageBase64 = history.state.backSideImage64base || '';
    this.profileImage = history.state.profileImage64Base || '';

    if (history.state.ocrData?.dateOfBirth !== undefined) {
      const splitDateFormat = history.state.ocrData.dateOfBirth.split(' ');
      this.customer.dateOfBirth = splitDateFormat[2] + '-' + splitDateFormat[1] + '-' + splitDateFormat[0] || '';
      // console.log(this.customer.dateOfBirth);


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
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    this.customer = {
      ...this.customer,
      customerName: this.nidScanDetailsForm.value.nidName,
      dateOfBirth: this.customerDetails.dateOfBirth != null? this.customerDetails.dateOfBirth : this.nidScanDetailsForm.value.dateOfBirth,
      pin: this.nidScanDetailsForm.value.confirmPassword,
      mobileNumber: this.phoneNo,
      fatherName: this.nidScanDetailsForm.value.fathersName,
      motherName: this.nidScanDetailsForm.value.mothersName,
      email: this.nidScanDetailsForm.value.email,
      requestId: AppUtils.generateId(16),
      hardwareSignature: this.deviceId.uuid,
      profilePicture: this.profileImage,
      nidObject: {
        ...this.customer.nidObject,
        nid: this.nidScanDetailsForm.value.nidNo,
        nidImageFirstPage: this.fontSideNidImageBae64,
        nidImageSecondPage: this.backSideNidImageBase64
      }
    };

    console.log(this.nidScanDetailsForm.value.dateOfBirth);

    console.log(this.customer);

    // for (const i in this.nidScanDetailsForm.controls) {
    //   if (this.nidScanDetailsForm.controls.hasOwnProperty(i)) {
    //     this.nidScanDetailsForm.controls[i].markAsDirty();
    //     this.nidScanDetailsForm.controls[i].updateValueAndValidity();
    //   }
    // }
    if (this.nidScanDetailsForm.valid) {
      // this.loadingController.create({
      //   cssClass: 'my-custom-class',
      //   message: 'Please wait...',
      // }).then(res => res.present());
      Storage.set({key: 'RegUser', value: JSON.stringify(this.customer)});

      this.userService.createCustomer(this.customer)
        .subscribe(
          res => {
            localStorage.setItem('myLSkey', JSON.stringify(res.data));
            // this.loadingController.dismiss();
            const data = res.data;
            this.router.navigateByUrl('/common/otp', {
              state: {
                resData: data,
                customer: this.customer,
                type: FormType.registration,
                perpose: 2
              }
            });
          },
          err => {
            // this.loadingController.dismiss();
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
        matchingControl.setErrors({confirmedValidator: true});
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
      permanentAddress: 'Dhaka',
      pin: '4321',
      presentAddress: 'Dhaka',
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
