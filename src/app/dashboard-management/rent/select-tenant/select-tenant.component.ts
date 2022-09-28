import { Component, OnInit } from '@angular/core';
import { Contact, Contacts, NewContact } from '@capacitor-community/contacts';
import { ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { CheckPhoneNoStatus } from 'src/app/user-management/@model/CheckPhoneNoStatus';
import { RentSlip } from '../../@model/rentSlip';
import { Storage } from '@capacitor/storage';
import { RentService } from '../../@service/rent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-tenant',
  templateUrl: './select-tenant.component.html',
  styleUrls: ['./select-tenant.component.scss'],
})
export class SelectTenantComponent implements OnInit {
  contacts: Observable<Contact[]>;
  public checkPhoneNoStatus: CheckPhoneNoStatus = new CheckPhoneNoStatus();
  isClassChange = false;
  msg = '';
  headerText = 'Rent';
  termsConditions: boolean = false;
  templateObj: any;
  rentSlip: RentSlip = {
    templateId: 0,
    tenantsId: '',
    ownerId: '',
    tenantsName: '',
  };
  isContactShow = false;
  mobileNumber:number = 0;

  // public contactsList = [
  //   { displayName: 'Shaon', phoneNumbers: '01823578649' },
  //   { displayName: 'ataur', phoneNumbers: '01823578649' },
  //   { displayName: 'rahi', phoneNumbers: '01823578649' },
  //   { displayName: 'ovi', phoneNumbers: '01823578649' },
  //   { displayName: 'ateeb', phoneNumbers: '01823578649' },
  // ];

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

  constructor(
    private toastController: ToastController,
    private rentService: RentService,
    private router: Router
  ) {}

  async ngOnInit() {
    const { value } = await Storage.get({ key: 'phoneNo' });
    this.templateObj = history.state.templateObj;
    this.rentSlip.ownerId = value;
    this.rentSlip.templateId = this.templateObj.id;
    this.mobileNumber = this.templateObj.id;
    console.log('rentPreview', this.templateObj);
    console.log('rentPreview', this.mobileNumber);
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
    this.rentSlip.tenantsName = contact.displayName;
    console.log('select name', this.rentSlip.tenantsName);
  }
  selectTenantNumber(item) {
    this.rentSlip.tenantsId = item.number;
    console.log('select number', this.rentSlip.tenantsId);
  }
  

  saveRentSlip() {
    if( this.rentSlip.tenantsId == null || this.rentSlip.tenantsId == undefined || this.rentSlip.tenantsName == null || this.rentSlip.tenantsName == undefined  ){
      return;
    }
    this.rentService.createRentSlip(this.rentSlip).subscribe((res) => {
      console.log('res', res);
      this.router.navigateByUrl('/dashboard/rent/rent-success');
    }),
      (error) => {
        console.log('res', error);
      };
  }

  // getContact() {
  //   return this.contactsList;
  // }
}


// {
//   "displayName" : "shaon";
//   "phoneNumbers" : [
//     {
//       "label" : "A",
//       "number" : "01823578649"
//     },
//     {
//       "label" : "B",
//       "number" : "01823578649"
//     },
//     {
//       "label" : "C",
//       "number" : "01823578649"
//     },
//     {
//       "label" : "D",
//       "number" : "01823578649"
//     }
//   ]
// }
