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
export class RentService {

  apiUrl = 'https://softbyte.co/phoneacms/phone/rentslip';

  constructor(private http:HttpClient) { }

  createRentSlip(rentSlip: RentSlip): Observable<RentSlip> {
    return this.http.post<RentSlip>(`${this.apiUrl}/create `, rentSlip);
  }

  getRentSlipList(ownerId:string): Observable<RentSlipList[]> {
    return this.http.get<RentSlipList[]>(`${this.apiUrl}/list/${ownerId}`);
  }

  getRentSlipDetails(ownerId:string, slipId:number): Observable<RentSlipDetails> {
    return this.http.get<RentSlipDetails>(`${this.apiUrl}/details/${ownerId}/${slipId}`);
  }

  RentSlipStatusUpdate(status:RentStausUpdate): Observable<RentStausUpdate> {
    return this.http.post<RentStausUpdate>(`${this.apiUrl}/statusUpdate`,status);
  }

}
