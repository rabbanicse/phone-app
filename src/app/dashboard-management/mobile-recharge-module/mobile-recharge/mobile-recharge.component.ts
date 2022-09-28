import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact, Contacts, NewContact } from '@capacitor-community/contacts';
import { ToastController } from '@ionic/angular';
import { CheckPhoneNoStatus } from 'src/app/user-management/@model/CheckPhoneNoStatus';
import { Operator } from 'src/app/utility/enums/enum';

@Component({
  selector: 'app-mobile-recharge',
  templateUrl: './mobile-recharge.component.html',
  styleUrls: ['./mobile-recharge.component.scss'],
})
export class MobileRechargeComponent implements OnInit {
  headerText = 'Mobile Recharge';
  contacts: Observable<Contact[]>;
  public checkPhoneNoStatus: CheckPhoneNoStatus = new CheckPhoneNoStatus();
  isClassChange = false;
  msg = '';
  termsConditions: boolean = false;
  isContactShow = false;
  name:any;
  number:any;

  // public contactsList = [
  //   {
  //     "displayName" : "shaon",
  //     "phoneNumbers" : [
  //       {
  //         "label" : "A",
  //         "number" : "01823578649"
  //       },
  //     ]
  //   },

  //   {
  //     "displayName" : "a",
  //     "phoneNumbers" : [
  //       {
  //         "label" : "A",
  //         "number" : "01323578649"
  //       },
       
  //     ]
  //   }
  //   ,

  //   {
  //     "displayName" : "b",
  //     "phoneNumbers" : [
  //       {
  //         "label" : "A",
  //         "number" : "01323578649"
  //       },
       
  //     ]
  //   }
  //   ,

  //   {
  //     "displayName" : "c",
  //     "phoneNumbers" : [
  //       {
  //         "label" : "A",
  //         "number" : "01323578649"
  //       },
       
  //     ]
  //   }
  //   ,

  //   {
  //     "displayName" : "d",
  //     "phoneNumbers" : [
  //       {
  //         "label" : "A",
  //         "number" : "01323578649"
  //       },
       
  //     ]
  //   }
  //   ,

  //   {
  //     "displayName" : "e",
  //     "phoneNumbers" : [
  //       {
  //         "label" : "A",
  //         "number" : "01323578649"
  //       },
       
  //     ]
  //   }
  //   ,

  //   {
  //     "displayName" : "f",
  //     "phoneNumbers" : [
  //       {
  //         "label" : "A",
  //         "number" : "01323578649"
  //       },
       
  //     ]
  //   }
  //   ,

  //   {
  //     "displayName" : "g",
  //     "phoneNumbers" : [
  //       {
  //         "label" : "A",
  //         "number" : "01323578649"
  //       },
       
  //     ]
  //   },

  //   {
  //     "displayName" : "h",
  //     "phoneNumbers" : [
  //       {
  //         "label" : "A",
  //         "number" : "01323578649"
  //       },
       
  //     ]
  //   }
  //   ,

  //   {
  //     "displayName" : "i",
  //     "phoneNumbers" : [
  //       {
  //         "label" : "A",
  //         "number" : "01323578649"
  //       },
       
  //     ]
  //   }

  // ]


  constructor(private toastController: ToastController) {}

  async ngOnInit() {}

  async getPermissions(): Promise<void> {
    console.log('button clicked');
    await Contacts.getPermissions();
  }

  async getContacts(): Promise<void> {
    console.log('tesbutton clicked');
    await Contacts.getPermissions();
    Contacts.getContacts().then((result) => {
      console.log('result is:', result);
      const phoneContacts: Contact[] = result.contacts;
      this.contacts = of(phoneContacts);
    });
  }

  async saveContact() {
    const newContact: NewContact = {
      givenName: 'Arthur',
      familyName: 'Dent',
    };

    Contacts.saveContact(newContact);
    const toast = await this.toastController.create({
      message: `${newContact.givenName} saved`,
      duration: 2000,
    });
    toast.present();
  }

  selectTenant(contact) {
    this.isContactShow = true;
    // var Obj = contact.phoneNumbers.find((x) => x.displayName == contact.displayName);
    // this.rentSlip.tenantsId = Obj.number;
    this.name = contact.displayName;
    console.log('select name', this.contacts);
  }
  selectTenantNumber(item) {
    this.number = item.number;
    console.log('select number', this.contacts);
  }


  showPreviewBl() {
    this.checkPhoneNoStatus.operator = Number(
      document.getElementById('blImg').getAttribute('value')
    );
    if (this.checkPhoneNoStatus.operator == Operator.BANGLALINK) {
      this.checkPhoneNoStatus.operator = Operator.BANGLALINK;
      this.isClassChange = true;
      // debugger;
      console.log('BL', this.checkPhoneNoStatus.operator);
    }
  }
  showPreviewRobi() {
    this.checkPhoneNoStatus.operator = Number(
      document.getElementById('robiImg').getAttribute('value')
    );
    if (this.checkPhoneNoStatus.operator == Operator.ROBI) {
      this.checkPhoneNoStatus.operator = Operator.ROBI;
      this.isClassChange = true;
      console.log('ROBI', this.checkPhoneNoStatus.operator);
    }
  }
  showPreviewAirtel() {
    this.checkPhoneNoStatus.operator = Number(
      document.getElementById('airtelImg').getAttribute('value')
    );
    if (this.checkPhoneNoStatus.operator == Operator.AIRTEL) {
      this.checkPhoneNoStatus.operator = Operator.AIRTEL;
      this.isClassChange = true;
      console.log('AIRTEL', this.checkPhoneNoStatus.operator);
    }
  }

  showPreviewGp() {
    this.checkPhoneNoStatus.operator = Number(
      document.getElementById('gpImg').getAttribute('value')
    );
    if (this.checkPhoneNoStatus.operator == Operator.GRAMEENPHONE) {
      this.checkPhoneNoStatus.operator = Operator.GRAMEENPHONE;
      this.isClassChange = true;
      console.log('GRAMEENPHONE', this.checkPhoneNoStatus.operator);
    }
  }

  showPreviewTeletalk() {
    this.checkPhoneNoStatus.operator = Number(
      document.getElementById('teletalkImg').getAttribute('value')
    );
    if (this.checkPhoneNoStatus.operator == Operator.TELETALK) {
      this.checkPhoneNoStatus.operator = Operator.TELETALK;
      this.isClassChange = true;
      console.log('TELETALK', this.checkPhoneNoStatus.operator);
    }
  }

  
  // getContact() {
  //   return this.contactsList;
  // }

}
