import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AmountComponent } from './amount/amount.component';
import { SelectReceiverComponent } from './select-receiver/select-receiver.component';

const routes: Routes = [
  {path: 'select-receiver', component: SelectReceiverComponent},
  {path: 'enter-amount', component: AmountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestMoneyRoutingModule {
}
