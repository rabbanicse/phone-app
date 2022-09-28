import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Template } from '../@model/template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  
  apiUrl = 'https://softbyte.co/phoneacms/phone/template';

  constructor(private http:HttpClient) { }

  createTemplate(template: Template): Observable<Template> {
    return this.http.post<Template>(`${this.apiUrl}/create `, template);
  }

  getTemplateList(ownerId:string ): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.apiUrl}/list/${ownerId}`);
  }

  getTemplateDetails(id:number ): Observable<Template> {
    return this.http.get<Template>(`${this.apiUrl}/details/${id}`);
  }

}
