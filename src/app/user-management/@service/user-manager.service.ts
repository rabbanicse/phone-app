import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CheckPhoneNoStatus} from "../@model/CheckPhoneNoStatus";
import {Verification} from "../@model/Verification";
import {Customer} from "../@model/Customer";
import {PhoneADevice} from 'src/app/dashboard-management/@model/phoneADevice';
import {ForgotPassword} from "../@model/ForgotPassword";
import {ResetPassword} from "../@model/ResetPassword";
import {Storage} from '@capacitor/storage';
import {DomSanitizer} from '@angular/platform-browser';
import {map, mergeMap, switchMap} from "rxjs/operators";
import {forkJoin, from, Observable} from "rxjs";
import {Card} from "../../dashboard-management/@model/Card";
import { ChangePin } from '../@model/changePin';
import { ChangePassword } from '../@model/ChangePassword';
import { Logout } from '../@model/logout';
import { UserProfileInfo } from '../@model/UserProfileInfo';
import { emailVerified } from '../@model/emailVerified';
import { EmailVerifiedComponent } from '../email-verified/email-verified.component';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  apiUrlAddDevice = 'https://softbyte.co/phone-a-user-profile-management/v1/service/dmf/addNewDevice';
  apiUrl = 'https://softbyte.co/phone-a-user-profile-management/v1/service/customer';
  publicImage = 'https://softbyte.co/phone-a-user-profile-management/v1/service/public';
  nidPhotoUrl = 'https://softbyte.co/phone-a-user-profile-management/v1/service/customer/getUserNidBothPartDocument';

  constructor(private translateService:TranslateService, private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  resendOtp(payload: any){
    return this.http.post<any>(`${this.apiUrl}/resendOtp `,payload);
  }

  getMobileNumberStatus(checkPhoneStatus: CheckPhoneNoStatus) {
    return this.http.post<CheckPhoneNoStatus>(`${this.apiUrl}/getMobileNumberStatus `, checkPhoneStatus);
  }

  createCustomer(customer: Customer) {
    return this.http.post<any>(`${this.apiUrl}/createPhoneACustomer `, customer);
  }

  updateUserNidBothDocument(customer: Customer) {
    return this.http.post<any>(`${this.apiUrl}/updateUserNidBothDocument `, customer);
  }

  customerVerification(checkPhoneStatus: Verification) {
    return this.http.post<any>(`${this.apiUrl}/verification `, checkPhoneStatus);
  }

  login(user: any) {
    return this.http.post<any>(`${this.apiUrl}/login `, user);
  }

  addDevice(device: PhoneADevice) {
    return this.http.post<any>(`${this.apiUrlAddDevice}/ `, device);
  }

  forgotPin(payload: ForgotPassword) {
    return this.http.post<any>(`${this.apiUrl}/forgotPin`, payload);

  }

  uploadProfileImage(payload: any) {
    console.log('service', payload)
    return this.http.post<any>(`${this.apiUrl}/uploadDocument`, payload);
  }

  getProfileImage(payload: any) {
    return this.http.post(this.apiPhoto, payload, {responseType: 'blob'});
  }

  emailVerificatiion(payload: emailVerified) {
    return this.http.post<any>(`${this.apiUrl}/sendEmailVerificationCode`, payload);
  }

  getProfilefront(payload: any) {
    return this.http.post(this.apiPhoto, payload, {responseType: 'blob'})
      .pipe(map(data => {

      }));
  }

  getProfileImageBack(payload: any) {
    return this.http.post(this.apiPhoto, payload, {responseType: 'blob'});
  }

  getNidPhotos(payload) {
    return this.http.post(this.nidPhotoUrl, payload).pipe(
      switchMap((response: any) => {
        console.log(response);
        const payloadForFontSide = {
          fileName: response.data.nidFrontUrl
        };
        const payloadForBackSide = {
          fileName: response.data.nidBackUrl
        };
        return forkJoin({
          frontSide: this.getProfileImage(payloadForFontSide),
          backSide: this.getProfileImage(payloadForBackSide)
        });
      })
    );


    // return this.http.post(this.nidPhotoUrl, payload).pipe(
    //   map( res => {
    //     console.log(res);
    //   }
    //   )
    // );
  }


  apiPhoto = `${this.publicImage}/getDocument`;
  // public url : SafeResourceUrl;
  //
  // constructor(private http: HttpClient) {
  //   this.getImage('/api/image.jpg').subscribe(x => this.url = x)
  // }
  //
  // public getImage(url: string): Observable<SafeResourceUrl> {
  //   return this.http
  //     .get(url, { responseType: 'blob' })
  //     .pipe(
  //       map(x => {
  //         const urlToBlob = window.URL.createObjectURL(x) // get a URL for the blob
  //         return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); // tell Anuglar to trust this value
  //       }),
  //     );
  // }
  //

  resetPin(payload: ResetPassword) {
    return this.http.post<any>(`${this.apiUrl}/resetpin`, payload);
  }

  changePin(payload: ChangePassword) {
    return this.http.post<any>(`${this.apiUrl}/changepin`, payload);
  }

  async getUserInfo() {
    const {value} = await Storage.get({key: 'user'});
    return JSON.parse(value);
  }
  async getRegisrationInfoFromLocalStorage() {
    const {value} = await Storage.get({key: 'RegUser'});
    return JSON.parse(value);
  }

  async getReferenceIdFromLocalStorage() {
    const {value} = await Storage.get({key: 'user'});
    return JSON.parse(value).data.referenceId;
  }

  async getSessionToken() {
    const {value} = await Storage.get({key: 'user'});
    let parse = JSON.parse(value).data.sessionToken;
    return parse;
  }

  async getRequestId() {
    const {value} = await Storage.get({key: 'user'});
    let parse = JSON.parse(value).requestId;
    return parse;
    }


  async getClientType() {
    const {value} = await Storage.get({key: 'user'});
    let parse = JSON.parse(value).data.customerType;
    return parse;
    }

  async getProfilePicture() {
    const {value} = await Storage.get({key: 'user'});
    let parse = JSON.parse(value).data.documentName;
    return parse;
  }

  async getEmailVerification() {
    const {value} = await Storage.get({key: 'user'});
    let parse = JSON.parse(value).data.settings.isEmailVerified;
    return parse;
  }

  uploadPhotos(payload, base64) {
    return this.http.post<any>(`${this.apiUrl}/uploadDocument`, payload);
  }

  getCardbyPhone(): Observable<Card[]> {
    return from(Storage.get({key: 'phoneNo'})).pipe(mergeMap(res => {
      return this.http.get<Card[]>(`${this.apiUrl}/phone/${res.value}`);
    }));
  }

  forceChangePin(payload: ChangePin){
    return this.http.post<any>(`${this.apiUrl}/changepin`, payload);
  }

  logout(payload: Logout){
    return this.http.post<any>(`${this.apiUrl}/logout`, payload);
  }

  async getPhoneNo() {
    const {value} = await Storage.get({key: 'user'});
    const parse = JSON.parse(value).data.mobileNo;
    return parse;
  }

  getUserProfileInfo(payload: UserProfileInfo){
    return this.http.post<any>(`${this.apiUrl}/getUserProfileInfo`, payload);
  }

  async getNidNo() {
    const {value} = await Storage.get({key: 'customer'});
    const parse = JSON.parse(value).data.customerType;
    return parse;
    }

  async setLanguage() {
    if (localStorage.getItem('language') === null || localStorage.getItem('language') === 'null') {
      this.translateService.addLangs(['English', 'Bangla']);
      this.translateService.setDefaultLang('English');
    } else {
      this.translateService.addLangs(['English', 'Bangla']);
      const object = localStorage.getItem('language');
      this.translateService.setDefaultLang(object);
    }
  }

}
