import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Device, DeviceInfo } from '@capacitor/device';
import { LoadingController, ToastController } from '@ionic/angular';
import { AppUtils } from 'src/app/utility/AppUtils';
import { ClientType } from 'src/app/utility/enums/enum';
import { ChangePin } from '../@model/changePin';
import { UserManagerService } from '../@service/user-manager.service';

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.component.html',
  styleUrls: ['./change-pin.component.scss'],
})
export class ChangePinComponent implements OnInit {

  changePinForm !:FormGroup
  changePinPayloadPassword = {} as ChangePin
  deviceId: any
  deviceInfo: DeviceInfo = {} as DeviceInfo
  token = ''
  Obj:any;
  isSubmitted = false;
  validator:any;

  constructor(   public toastController: ToastController,
    public userService: UserManagerService,
    public loadingController: LoadingController,
    private router: Router, private activatedRoute:ActivatedRoute) { }

  async ngOnInit() {
    this.initFormGroup()
    // console.log(await Device.getInfo())
    this.deviceId = await Device.getId();
    this.deviceInfo = await Device.getInfo();
    console.log(this.deviceInfo)
    console.log(this.deviceId)

    // this.activatedRoute
    // .queryParams
    // .subscribe(params => {
    //     let res = params['res'];
    //   console.log('param res',res);
    //   debugger;
    // });

    console.log(this.Obj = this.changePinPayloadPassword = history.state.forcePinData);
  }

  initFormGroup() {
    this.changePinForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
    return;
    }
    if (control.value !== matchingControl.value) {
    matchingControl.setErrors({ mustMatch: true });
    } else {
    matchingControl.setErrors(null);
    }
    }
    }

 async onSubmitForChangePin(){
  this.isSubmitted = true;
    this.changePinPayloadPassword.clientType = ClientType.ClientWallet;
    this.changePinPayloadPassword.newPin = this.changePinForm.value.newPassword;
    this.changePinPayloadPassword.oldPin = this.changePinForm.value.oldPassword;
    this.changePinPayloadPassword.forcePinChange = 'N';
    this.changePinPayloadPassword.deviceName = this.deviceInfo.model;
    this.changePinPayloadPassword.deviceNumber = this.deviceId.uuid;
    this.changePinPayloadPassword.hardwareSignature = this.deviceId.uuid;
    this.changePinPayloadPassword.mobileAppVersion = this.deviceInfo.osVersion;
    this.changePinPayloadPassword.mobileAppVersionCode = 1;
    this.changePinPayloadPassword.requestId = AppUtils.generateId(16);
    this.changePinPayloadPassword.sessionToken = await this.userService.getSessionToken();

    this.userService.forceChangePin(this.changePinPayloadPassword).subscribe((res)=>{
      if(res.status==200){
        this.router.navigate(['']);
      }else{
        this.loadingController.dismiss().then();
        this.toastController.create({
          message: `${'Server Error'}`,
          duration: 4000,
          color: 'danger',
          position: 'bottom'
        }).then(async suc => {
            await suc.present();
          })

      }
    }, error => {
      if (error.error.code === 30078) {
        this.loadingController.dismiss().then();
        this.toastController.create({
          message: `${error.error.message}`,
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
          message: `Force Pin Error`,
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

}
