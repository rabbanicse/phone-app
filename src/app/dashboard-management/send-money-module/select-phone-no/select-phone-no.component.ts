import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact, Contacts, NewContact } from '@capacitor-community/contacts';
import { ToastController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { CheckPhoneNoStatus } from 'src/app/user-management/@model/CheckPhoneNoStatus';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-select-phone-no',
  templateUrl: './select-phone-no.component.html',
  styleUrls: ['./select-phone-no.component.scss'],
})
export class SelectPhoneNoComponent implements OnInit {
  contacts: Observable<Contact[]>;
  public checkPhoneNoStatus: CheckPhoneNoStatus = new CheckPhoneNoStatus();
  headerText = 'Send Money';
  isContactShow = false;
  name:any;
  number:any;
  constructor(public translate: TranslateService, private toastController: ToastController, private router: Router) {
    //this.setLanguage();
  }


  async ngOnInit() {
    const { value } = await Storage.get({ key: 'phoneNo' });
  }

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

}
