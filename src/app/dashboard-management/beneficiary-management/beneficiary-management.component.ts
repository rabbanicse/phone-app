import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beneficiary-management',
  templateUrl: './beneficiary-management.component.html',
  styleUrls: ['./beneficiary-management.component.scss'],
})
export class BeneficiaryManagementComponent implements OnInit {
  headerText = 'Beneficiary Accounts';
  constructor() { }

  ngOnInit() {}

}
