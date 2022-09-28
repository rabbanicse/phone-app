import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Template } from '../../@model/template';
import { TemplateService } from '../../@service/template.service';
import {Storage} from '@capacitor/storage';

@Component({
  selector: 'app-rent-template',
  templateUrl: './rent-template.component.html',
  styleUrls: ['./rent-template.component.scss'],
})
export class RentTemplateComponent implements OnInit {
  headerText = 'Rent';
  templateList: Template[] = [];
  emptyTemplateMsg = 'No Template. Please Click Add Template To Create One';
  isemptyMsg = false;


  constructor(private templateService : TemplateService, private router: Router) { }

  ngOnInit() {
    this.getTemplateList();
  }

 async getTemplateList(){
    const {value}= await Storage.get({key: 'phoneNo'});
    this.isemptyMsg = true;
    this.templateService.getTemplateList(value).subscribe((res) => {
      this.templateList = res;
      if (this.templateList.length > 0){
      this.isemptyMsg = !this.isemptyMsg;
      }
      console.log('res',res); 
      //this.router.navigateByUrl('/dashboard/rent/rent-preview',{state:{template:res}}); 
    }), 
    error => {
      console.log('res',error);
  }

  }

}
