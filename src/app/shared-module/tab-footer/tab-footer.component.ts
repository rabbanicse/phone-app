import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab-footer',
  templateUrl: './tab-footer.component.html',
  styleUrls: ['./tab-footer.component.scss'],
})
export class TabFooterComponent implements OnInit {

  scanActive = false;
  result = null;

  constructor(public translate: TranslateService, public toastController: ToastController,) {
    this.setLanguage();
  }

  ngOnInit() {}

  setLanguage() {
    if (localStorage.getItem("language") === null || localStorage.getItem("language") === "null") {
      this.translate.addLangs(['English', 'Bangla']);
      this.translate.setDefaultLang('English');
    } else {
      this.translate.addLangs(['English', 'Bangla']);
      let object = localStorage.getItem("language");
      this.translate.setDefaultLang(object);
    }
  }

  startScan = async () => {
    this.scanActive = true;
    let allowed = await this.checkPermission();
    BarcodeScanner.hideBackground(); // make background of WebView transparent
    document.body.style.opacity="0.2";
    document.body.style.background = "transparent";
    if (allowed) {
      this.scanActive = true;
      const result = await BarcodeScanner.startScan();
      console.log('Start Scanner', result);
      if (result.hasContent) {
        document.body.style.background = "";
        document.body.style.opacity="1";
        this.result = result.content;
        this.scanActive = false;
      }
    }
  };

  checkPermission = async () => {
    // check if user already granted permission
    const status = await BarcodeScanner.checkPermission({force: false});

    if (status.granted) {
      // user granted permission
      return true;
    }

    if (status.denied) {
      // user denied permission
      return false;
    }

    if (status.asked) {
      // system requested the user for permission during this call
      // only possible when force set to true
    }

    if (status.neverAsked) {
      // user has not been requested this permission before
      // it is advised to show the user some sort of prompt
      // this way you will not waste your only chance to ask for the permission
      const c = confirm(
        'We need your permission to use your camera to be able to scan barcodes',
      );
      if (!c) {
        return false;
      }
    }

    if (status.restricted || status.unknown) {
      // ios only
      // probably means the permission has been denied
      return false;
    }

    // user has not denied permission
    // but the user also has not yet granted the permission
    // so request it
    const statusRequest = await BarcodeScanner.checkPermission({force: true});

    if (statusRequest.asked) {
      // system requested the user for permission during this call
      // only possible when force set to true
    }

    if (statusRequest.granted) {
      // the user did grant the permission now
      return true;
    }

    // user did not grant the permission, so he must have declined the request
    return false;
  };

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  notFunctional(){
    this.toastController.create({
      message: 'Not Functional yet!',
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    }).then(async suc => {
      await suc.present();
    });
    console.log('Not Functional yet!');
    // this.router.navigateByUrl('');
  }

}
