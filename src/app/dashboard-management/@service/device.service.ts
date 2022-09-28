import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  apiUrl = 'https://softbyte.co/phone-a-user-profile-management/v1/service/dmf/addNewDevice';

  constructor(private http:HttpClient) { }
}
