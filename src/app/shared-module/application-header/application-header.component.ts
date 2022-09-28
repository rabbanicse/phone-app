import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-application-header',
  templateUrl: './application-header.component.html',
  styleUrls: ['./application-header.component.scss'],
})
export class ApplicationHeaderComponent implements OnInit {
  @Input() public applicationHeader: string;
  
  constructor(public translate: TranslateService) {
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

}
