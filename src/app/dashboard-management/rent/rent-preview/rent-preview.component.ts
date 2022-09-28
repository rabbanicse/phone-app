import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-preview',
  templateUrl: './rent-preview.component.html',
  styleUrls: ['./rent-preview.component.scss'],
})
export class RentPreviewComponent implements OnInit {
  headerText = 'Rent';
  templateObj:any;

  constructor(private router:Router) { }

  ngOnInit() {
    this.templateObj = history.state.template;
    console.log('rentPreview', this.templateObj); 
  }

  goToTenants(){
    this.router.navigateByUrl('/dashboard/rent/select-tenant', {state: {templateObj: this.templateObj}}); 
  }

}
