import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddCardComponent} from './add-card/add-card.component';
import {BillPayComponent} from './bill-pay/bill-pay.component';
import {CardsComponent} from './cards/cards.component';

import {CreditCardBillPayComponent} from './credit-card-bill-payment-module/credit-card-bill-pay/credit-card-bill-pay.component';
import {DashboardComponent} from './dashboard/dashboard.component';

import {PromotionalOfferComponent} from './promotional-offer/promotional-offer.component';
import {BeneficiaryManagementComponent} from './beneficiary-management/beneficiary-management.component';
import {BeneficiaryAccountAddComponent} from './beneficiary-account-add/beneficiary-account-add.component';
import {FeedbackListComponent} from './feedback-list/feedback-list.component';
import {FeedbackAddComponent} from './feedback-add/feedback-add.component';
import {MobileRechargeComponent} from "./mobile-recharge-module/mobile-recharge/mobile-recharge.component";
import {MarchentQrComponent} from "./marchent-qr/marchent-qr.component";
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { SelectContactComponent } from './select-contact/select-contact.component';
import { FeedbackMessagesComponent } from './feedback-messages/feedback-messages.component';
import { FeedbackChatComponent } from './feedback-chat/feedback-chat.component';

const routes: Routes = [
  {path: 'add-card', component: AddCardComponent, pathMatch: 'full'},
  // {path: 'bill-pay', component: BillPayComponent, pathMatch: 'full'},
  {path: 'card', component: CardsComponent, pathMatch: 'full'},
  // {path: 'credit-card', component: CreditCardBillPayComponent, pathMatch: 'full'},
  {path: 'promotional-offer', component: PromotionalOfferComponent, pathMatch: 'full'},
  {path: 'beneficiary-management', component: BeneficiaryManagementComponent, pathMatch: 'full'},
  {path: 'add-beneficiary-account', component: BeneficiaryAccountAddComponent, pathMatch: 'full'},
  {path: 'feedback', component: FeedbackListComponent, pathMatch: 'full'},
  {path: 'add-feedback', component: FeedbackAddComponent, pathMatch: 'full'},
  {path: 'feedback-message', component: FeedbackMessagesComponent, pathMatch: 'full'},
  {path: 'mobile-recharge', component: MobileRechargeComponent, pathMatch: 'full'},
  {path: 'marchent-qr', component: MarchentQrComponent, pathMatch: 'full'},
  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {path: 'transaction-report', component: TransactionReportComponent, pathMatch: 'full'},
  {path: 'my-account', component: MyAccountComponent, pathMatch: 'full'},
  {path: 'select-contact', component: SelectContactComponent, pathMatch: 'full'},
  {path: 'feedback-chat', component: FeedbackChatComponent, pathMatch: 'full'},
  {
    path: 'send-money',
    loadChildren: () => import('./send-money-module/send-money.module').then(m => m.SendMoneyModule)
  },
  {
    path: 'pay',
    loadChildren: () => import('./pay-module/pay.module').then(m => m.PayModule)
  },
  {
    path: 'user-info',
    loadChildren: () => import('./user-profile-module/user-profile.module').then(m => m.UserProfileModule)
  },

  {
    path: 'req-money',
    loadChildren: () => import('./request-money-module/request-money.module').then(m => m.RequestMoneyModule)
  },

  {
    path: 'bill-pay',
    loadChildren: () => import('./credit-card-bill-payment-module/credit-card-bill-payment.module').then(m => m.CreditCardBillPaymentModule)
  },

  {
    path: 'recharge',
    loadChildren: () => import('./mobile-recharge-module/mobile-recharge.module').then(m => m.MobileRechargeModule)
  },
  {
    path: 'scan',
    loadChildren: () => import('./scan/scan.module').then(m => m.ScanModule)
  },
  {
    path: 'rent',
    loadChildren: () => import('./rent/rent.module').then(m => m.RentModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
