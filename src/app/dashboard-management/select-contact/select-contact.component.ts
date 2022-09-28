import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-contact',
  templateUrl: './select-contact.component.html',
  styleUrls: ['./select-contact.component.scss'],
})
export class SelectContactComponent implements OnInit {
  headerText = 'Select Contact';
  public contactsList = [
    {
      "displayName" : "shaon",
      "phoneNumbers" : [
        {
          "label" : "A",
          "number" : "01823578649"
        },
      ]
    },

    {
      "displayName" : "a",
      "phoneNumbers" : [
        {
          "label" : "A",
          "number" : "01323578649"
        },

      ]
    }
    ,

    {
      "displayName" : "b",
      "phoneNumbers" : [
        {
          "label" : "A",
          "number" : "01323578649"
        },

      ]
    }
    ,

    {
      "displayName" : "c",
      "phoneNumbers" : [
        {
          "label" : "A",
          "number" : "01323578649"
        },

      ]
    }
    ,

    {
      "displayName" : "d",
      "phoneNumbers" : [
        {
          "label" : "A",
          "number" : "01323578649"
        },

      ]
    }
    ,

    {
      "displayName" : "e",
      "phoneNumbers" : [
        {
          "label" : "A",
          "number" : "01323578649"
        },

      ]
    }
    ,

    {
      "displayName" : "f",
      "phoneNumbers" : [
        {
          "label" : "A",
          "number" : "01323578649"
        },

      ]
    }
    ,

    {
      "displayName" : "g",
      "phoneNumbers" : [
        {
          "label" : "A",
          "number" : "01323578649"
        },

      ]
    },

    {
      "displayName" : "h",
      "phoneNumbers" : [
        {
          "label" : "A",
          "number" : "01323578649"
        },

      ]
    }
    ,

    {
      "displayName" : "i",
      "phoneNumbers" : [
        {
          "label" : "A",
          "number" : "01323578649"
        },

      ]
    }



  ]
  constructor() { }

  ngOnInit() {}
  getContact() {
    return this.contactsList;
  }

}
