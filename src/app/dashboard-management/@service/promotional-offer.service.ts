import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PromotionalOffer } from '../@model/promotionalOffer';

@Injectable({
  providedIn: 'root'
})
export class PromotionalOfferService {

  apiUrl = 'https://softbyte.co/phoneacms/phone';
  //apiUrl = 'http://alliance.softbyte.co:8181/phoneacms/phone';

  constructor(private http:HttpClient) { }

  getPromotionalOffer(): Observable<PromotionalOffer[]> {
    return this.http.get<PromotionalOffer[]>(`${this.apiUrl}/promotion`);
  }

}
