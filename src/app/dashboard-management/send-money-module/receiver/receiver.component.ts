import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss'],
})
export class ReceiverComponent implements OnInit {

  headerText = 'Send Money';

  constructor() { }

  ngOnInit() {}

}
