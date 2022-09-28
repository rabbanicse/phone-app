import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CardService } from '../../dashboard-management/@service/card.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Card } from '../../dashboard-management/@model/Card';
import { FormType } from '../../utility/enums/enum';
import { UserManagerService } from '../../user-management/@service/user-manager.service';
import { Verification } from '../../user-management/@model/Verification';
import { Customer } from '../../user-management/@model/Customer';
import { NgOtpInputConfig } from 'ng-otp-input';
import { ResendOtp } from 'src/app/user-management/@model/ResendOTP';
import {Storage} from '@capacitor/storage';
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
})
export class OtpVerificationComponent implements OnInit {
  headerText = 'Phone A';
  public length: number;
  public maxLength: number;
  token = '';
  numbers = new Array(3);
  msg = '';
  card: Card;
  type: FormType;
  verification: Verification;
  resendOtp: ResendOtp;
  isResendOtp =false;
  resData: any;
  customer: Customer;

  config: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };

  constructor(public translate: TranslateService, private service: CardService,
    public toastController: ToastController,
    private router: Router,
    private userService: UserManagerService,
    public loadingController: LoadingController) {
    //this.setLanguage();
  }

  ngOnInit() {
    this.card = history.state.data || {};
    this.type = history.state.type;
    this.customer = history.state.customer || {};
    this.resData = history.state.resData || {};

    console.log(history.state);
    this.userService.getRegisrationInfoFromLocalStorage().then(result =>{
      this.customer = result;
    });
    console.log('RegData',this.customer);
    console.log('RegData',this.resData);
  }



  async confirmOtp() {


    if (this.token === '') {
      this.msg = 'Please Enter the OTP';

    } else if (this.type === FormType.registration) {
      this.headerText = 'Registration';
      this.verification = {
        ...this.getVerificationData(),
        verificationCode: this.token,
        ...this.resData,
      };
      this.customerVerification();
    } else if (this.card) {
      if (this.type === FormType.card) {
        this.headerText = 'Add Card';
        this.createCard();
      } else if (this.type === FormType.payment) {

      }
    } else {
      this.msg = 'Something went wrong please try again';
      // this.loadingController.dismiss().then();
      // await this.router.navigateByUrl('/dashboard');
    }
  }


  resendOtpFn() {
    if (this.type === FormType.registration) {
      this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
      }).then(res => res.present());
      this.resendOtp = {
        mobileNumber: this.customer.mobileNumber,
        referenceId: this.resData.referenceId,
        purpose: '2',  //Purpose should be 2 for registration otp
        deviceName: this.customer.deviceName,
        deviceNumber: this.customer.deviceNumber,
        hardwareSignature: this.customer.hardwareSignature,
        mobileAppVersion: this.customer.mobileAppVersion,
        mobileAppVersionCode: this.customer.mobileAppVersionCode,
        requestId: this.customer.requestId,
        sessionToken: ''
      };

      this.userService.resendOtp(this.resendOtp).subscribe(
        res => {
         if (res.status === 200) {
          this.isResendOtp= true;
          this.msg = 'Verification code was resend successfully';
           this.loadingController.dismiss().then();
          //  this.toastController.create({
          //    message: 'Verification code was resend successfully',
          //    duration: 2000,
          //    color: 'success',
          //    position: 'bottom'
          //  }).then(async suc => {
          //    await suc.present();
          //  });
          //  this.router.navigateByUrl('/');
         } else {
           console.log('error');
         }
       }, error => {
        //  this.loadingController.dismiss().then();
        this.msg = error.error.error.message;

       });
    }
  }


 async customerVerification() {
    // this.loadingController.create({
    //   cssClass: 'my-custom-class',
    //   message: 'Please wait...',
    // }).then(res => res.present());


    this.userService.customerVerification(this.verification).subscribe(
       res => {
        if (res.status == 200) {
          // this.loadingController.dismiss().then();
          // this.toastController.create({
          //   message: 'Registered Successfully',
          //   duration: 2000,
          //   color: 'success',
          //   position: 'bottom'
          // }).then(async suc => {
          //   await suc.present();
          // });
          this.router.navigateByUrl('/');
        } else {
          console.log('error');
        }
      }, error => {
        this.loadingController.dismiss().then();
        console.log(error.error.error.message);

        this.msg = error.error.error.message;
        ;

      });
  }

  createCard() {
    this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    }).then(res => res.present());

    this.service.createCard(this.card).subscribe(async () => {
      this.service.notify('cardAdded');
      this.loadingController.dismiss().then();

      await this.router.navigateByUrl('/common/message', {
        state: {
          title: 'Card Added Successfully',
          desc: `Congratulation! You have successfully added your ${this.card.cardType} card `
        }
      });

    }, error => {
      this.loadingController.dismiss().then();
    });
  }

  // async registration() {
  //   await this.router.navigateByUrl('/common/message', {
  //     state: {
  //       title: 'Congratulations',
  //       desc: `You registration is completed`
  //     }
  //   });
  // }

  getVerificationData() {
    return this.verification = {
      mobileNumber: this.customer.mobileNumber,
      referenceId: 'xbgykiqxhevndpmb1652990283828',
      userType: '5',
      verificationCode: '<',
      deviceName: 'samsung SM-G610F Android 8.1.0',
      deviceNumber: 'a9eeec9c7c67a2eb',
      // eslint-disable-next-line max-len
      hardwareSignature: '0dce008e21997595f62688d375321a230f51e89405fa9ac79db10f04d4898b0f00853bf03975fcf880821dc7449ef812dccf93984efb4b1c4c5b68e87f1c7931',
      mobileAppVersion: '2.3.1_IW_DEMO',
      mobileAppVersionCode: 50,
      requestId: 'D9B6E1E53FA310C6',
      sessionToken: ''
    };
  }

  // getResendOtpPaylod(){
  //   return this.resendOtp = {
  //     mobileNumber: this.customer.mobileNumber,
  //     referenceId: 'xbgykiqxhevndpmb1652990283828',
  //     userType: '5',
  //     verificationCode: '<',
  //     deviceName: 'samsung SM-G610F Android 8.1.0',
  //     deviceNumber: 'a9eeec9c7c67a2eb',
  //     // eslint-disable-next-line max-len
  //     hardwareSignature: '0dce008e21997595f62688d375321a230f51e89405fa9ac79db10f04d4898b0f00853bf03975fcf880821dc7449ef812dccf93984efb4b1c4c5b68e87f1c7931',
  //     mobileAppVersion: '1.0.0',
  //     mobileAppVersionCode: '1',
  //     requestId: 'D9B6E1E53FA310C6',
  //     sessionToken: ''
  //   };
  // }

  onOtpChange(otp) {
    this.token = otp;
    console.log(this.token);
  }
}


// otp(){
//   this.verification = {
//     mobileNumber: this.mobileNumber,
//     referenceId: history.state.referenceId,
//     userType: history.state.userType,
//     verificationCode: this.token,
//     deviceName: 'samsung SM-G610F Android 8.1.0',
//     deviceNumber: 'a9eeec9c7c67a2eb',
// eslint-disable-next-line max-len
//     hardwareSignature: '0dce008e21997595f62688d375321a230f51e89405fa9ac79db10f04d4898b0f00853bf03975fcf880821dc7449ef812dccf93984efb4b1c4c5b68e87f1c7931',
//     mobileAppVersion: '1.0.0',
//     mobileAppVersionCode:1,
//     requestId:"202205191700",
//     sessionToken:"",
//     status:1
//     }
//   this.userService.customerVerification(this.verification).subscribe(res => {
//     if (res.status == ResponseStatus.success){
//       this.router.navigateByUrl('/');
//     } else {
//       this.toastController.create({
//         message: res.error.message,
//         duration: 2000,
//         color: 'danger',
//         position: 'bottom'
//       }).then(async suc => {
//           await suc.present();
//         }
//       );
//     }})
// }
