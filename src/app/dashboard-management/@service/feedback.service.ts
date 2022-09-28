import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentSlip } from '../@model/rentSlip';
import { RentSlipDetails } from '../@model/rentSlipDetails';
import { RentSlipList } from '../@model/rentSlipList';
import { RentStausUpdate } from '../@model/rentStatusUpdate';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  apiUrl = 'https://softbyte.co/phone-a-user-profile-management/v1/service/customer';

  constructor(private http:HttpClient) { }

  createFeedback(object: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createFeedback `, object);
  }

  getFeedback(obj:any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/getFeedback`,obj);
  }

  createFeedbackMessage(object: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createFeedbackMessage `, object);
  }

  getFeedbackMessage(obj:any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/getFeedbackMessages`,obj);
  }

  updateStatus(obj:any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/updateFeedbackStatus`,obj);
  }

}
