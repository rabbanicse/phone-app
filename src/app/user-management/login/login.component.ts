import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {Storage} from '@capacitor/storage';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../@model/Customer';
import {Observable} from 'rxjs';
import {ClientType} from 'src/app/utility/enums/enum';
import {UserManagerService} from '../@service/user-manager.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {PhoneADevice} from 'src/app/dashboard-management/@model/phoneADevice';
import {Device} from '@capacitor/device';
import {AppUtils} from "../../utility/AppUtils";
import { ChangePinComponent } from '../change-pin/change-pin.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  phoneNo: string;
  customer: Customer;
  loginForm: FormGroup;
  loginList$: Observable<Customer[]>;
  isSubmitted = false;
  login: Login;
  deviceId: any;
  appDeviceInfo: any;

  addNewDeviceObj: PhoneADevice = {
    mobileNumber: '',
    referenceId: '',
    verificationCode: '',
    productCode: '',
    deviceName: '',
    deviceNumber: '',
    hardwareSignature: '',
    requestId: '',
    sessionToken: ''
  };
  submitted = false;

  constructor(public translate: TranslateService,
    private router: Router,
    private userService: UserManagerService,
    public toastController: ToastController,
    public loadingController: LoadingController) {
    this.setLanguage();
  }

  async ngOnInit() {
    this.initFormGroup();
    this.deviceId = await Device.getId();
     this.appDeviceInfo= await Device.getInfo();

    console.log('Device ID', this.deviceId.uuid);
    console.log('Request Id',AppUtils.generateId(16));

  }

  initFormGroup() {
    this.loginForm = new FormGroup({
      mobileNumber: new FormControl('', Validators.required),
      pin: new FormControl('', Validators.required),
    });
  }

  async loginSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
      this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
      }).then(res => res.present());
      this.login = {
        clientType: ClientType.ClientWallet,
        fcmKey: ClientType.FcmKey,
        mobileNumber: this.loginForm.value.mobileNumber,
        pin: this.loginForm.value.pin,
        deviceName: this.appDeviceInfo.deviceName,
        deviceNumber: this.deviceId.uuid,
        hardwareSignature:  this.deviceId.uuid,
        requestId: AppUtils.generateId(16),
        sessionToken: '',
        userLoginIdType: 'MOBILE_NUMBER',
        mobileAppVersionCode: 0

      };
      this.userService.login(this.login).subscribe(async (res) => {
        console.log('login  ::', res);
        const data = JSON.stringify(res);
        await Storage.set({key: 'user', value: `${data}`});
        await Storage.set({key: 'phoneNo', value: `${this.login.mobileNumber}`});
        await Storage.set({key: 'referenceId', value: `${res.data.referenceId}`});
        this.loadingController.dismiss().then();
        await this.addNewDevice(res.data, res.requestId);
        if(res.data.shouldChangePassPin == 'Y'){
          this.changeForcePin(res);
        }
      }, error => {

        console.log(error.error.error);
        if (error.error.error.code === 30161) {
          this.loadingController.dismiss().then();
          this.toastController.create({
            message: `${error.error.error.message}`,
            duration: 4000,
            color: 'danger',
            position: 'bottom'
          }).then(async suc => {
              await suc.present();
            }
          );
        } else {
          this.loadingController.dismiss().then();
          this.toastController.create({
            message: `Invalid Credentials`,
            duration: 2000,
            color: 'danger',
            position: 'bottom'
          }).then(async suc => {
              await suc.present();
            }
          );
        }
      });
  }
  get f() { return this.loginForm.controls; }
  changeForcePin(res){
    this.router.navigate(['/change-pin'], {state: {forcePinData: res}}  );
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

  async addNewDevice(data, requestId) {
    this.addNewDeviceObj.mobileNumber = data.mobileNo;
    this.addNewDeviceObj.referenceId = data.referenceId;
    this.addNewDeviceObj.verificationCode = '';
    this.addNewDeviceObj.productCode = data.settings.productCode;
    this.addNewDeviceObj.deviceName = this.appDeviceInfo.model;
    this.addNewDeviceObj.deviceNumber = this.deviceId.uuid;
    this.addNewDeviceObj.hardwareSignature = this.deviceId.uuid;
    this.addNewDeviceObj.requestId = requestId;
    this.addNewDeviceObj.sessionToken = data.sessionToken;
    if (data.newDevice) {
      await this.router.navigateByUrl('/add-device-otp', {state: {otpData: this.addNewDeviceObj}});
    } else {
      await this.router.navigateByUrl('/dashboard');
    }

  }
}

interface Login {
  clientType: string;
  fcmKey: string;
  mobileNumber: string;
  pin: string;
  deviceName: string;
  deviceNumber: string;
  hardwareSignature: string;
  requestId: string;
  sessionToken: string;
  userLoginIdType: string;
  mobileAppVersionCode: number;
}
