import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class NidServiceService {

  apiURL = 'http://194.233.91.122:8001';

  constructor(platform: Platform, private http: HttpClient) {
  }

  getNidUserData(data: FormData): any {
    return this.http.post<any>(this.apiURL, data);
  }
}
