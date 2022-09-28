import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AddCardComponent} from './add-card/add-card.component';
import {BillPayComponent} from './bill-pay/bill-pay.component';
import {CardsComponent} from './cards/cards.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {TabFooterComponent} from '../shared-module/tab-footer/tab-footer.component';
import {SharedModule} from '../shared-module/shared.module';
import {TranslateModule} from '@ngx-translate/core';

import {CommonModule} from '@angular/common';
import {PromotionalOfferComponent} from './promotional-offer/promotional-offer.component';
import {CropImageComponent} from '../user-management/crop-image/crop-image.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {BeneficiaryAccountAddComponent} from './beneficiary-account-add/beneficiary-account-add.component';
import {BeneficiaryManagementComponent} from './beneficiary-management/beneficiary-management.component';
import {FeedbackAddComponent} from './feedback-add/feedback-add.component';
import {FeedbackListComponent} from './feedback-list/feedback-list.component';
import {SendMoneyModule} from './send-money-module/send-money.module';
import {PayModule} from './pay-module/pay.module';
import {UserProfileModule} from './user-profile-module/user-profile.module';
import {RequestMoneyModule} from './request-money-module/request-money.module';
import {MobileRechargeModule} from './mobile-recharge-module/mobile-recharge.module';
import {MarchentQrComponent} from "./marchent-qr/marchent-qr.component";
import { ScanModule } from './scan/scan.module';
import { RentModule } from './rent/rent.module';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { SelectContactComponent } from './select-contact/select-contact.component';
import { FeedbackMessagesComponent } from './feedback-messages/feedback-messages.component';
import { FeedbackChatComponent } from './feedback-chat/feedback-chat.component';


@NgModule({
  declarations: [
    AddCardComponent,
    BillPayComponent,
    CardsComponent,
    TabFooterComponent,
    PromotionalOfferComponent,
    CropImageComponent,
    FeedbackListComponent,
    FeedbackAddComponent,
    FeedbackMessagesComponent,
    BeneficiaryManagementComponent,
    BeneficiaryAccountAddComponent,
    MarchentQrComponent,
    TransactionReportComponent,
    MyAccountComponent,
    SelectContactComponent,
    FeedbackChatComponent,

  ],
  exports: [
    TabFooterComponent,
    TranslateModule
  ],
  imports: [
    DashboardRoutingModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    ImageCropperModule,
    SendMoneyModule,
    PayModule,
    UserProfileModule,
    RequestMoneyModule,
    MobileRechargeModule,
    ScanModule,
    RentModule,
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class DashboardModule {
}
