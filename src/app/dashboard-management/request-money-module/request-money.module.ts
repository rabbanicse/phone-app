import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestMoneyRoutingModule } from './request-money-routing.moudle';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { SelectReceiverComponent } from './select-receiver/select-receiver.component';
import { AmountComponent } from './amount/amount.component';



@NgModule({
  declarations: [
    SelectReceiverComponent,
    AmountComponent,
  ],
  imports: [
    CommonModule,
    RequestMoneyRoutingModule,
    IonicModule,
    SharedModule,
  ]
})
export class RequestMoneyModule { }
