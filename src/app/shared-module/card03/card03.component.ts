import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card03',
  templateUrl: './card03.component.html',
  styleUrls: ['./card03.component.scss'],
})
export class Card03Component implements OnInit {
  headerText = 'Card Details';
  card: any;
  constructor(
    private router: Router,
  ) {
    this.card = history.state.card;
    console.log(this.card);

  }

  ngOnInit() {}

}
