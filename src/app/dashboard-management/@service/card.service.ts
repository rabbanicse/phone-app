import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Card} from '../@model/Card';
import {from, Observable} from 'rxjs';
import {Storage} from '@capacitor/storage';
import {mergeMap} from 'rxjs/operators';
import { UserManagerService } from '../../user-management/@service/user-manager.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  @Output()
  aClickedEvent = new EventEmitter<string>();

  apiUrl = 'https://softbyte.co/phoneacms/phone/card';
  // https://softbyte.co/phoneacms/phone/card/list
  // apiUrl = 'http://localhost:8999/phone/card';

  // eslint-disable-next-line @typescript-eslint/member-ordering



  constructor(private http: HttpClient,
    private userservice: UserManagerService,
    ) {
  }

  notify(msg: string) {
    this.aClickedEvent.emit(msg);
  }


  createCard(card: Card): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/create `, card);
  }

  getCardList(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/list`);
  }

  getCard(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.apiUrl}/${id}`);
  }

  getCardbyPhone(): Observable<Card[]> {
    return from(Storage.get({key: 'phoneNo'})).pipe(mergeMap(res => {
      return this.http.get<Card[]>(`${this.apiUrl}/phone/${res.value}`);
    }));
  }

}
