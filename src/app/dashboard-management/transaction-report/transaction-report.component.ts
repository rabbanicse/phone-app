import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.scss'],
})
export class TransactionReportComponent implements OnInit {
  headerText = 'Transaction Report';
  constructor() { }

  ngOnInit() {}

}
