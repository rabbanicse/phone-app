import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileRechargePaymentSuccessComponent } from './mobile-recharge-payment-success.component';

describe('MobileRechargePaymentSuccessComponent', () => {
  let component: MobileRechargePaymentSuccessComponent;
  let fixture: ComponentFixture<MobileRechargePaymentSuccessComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileRechargePaymentSuccessComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileRechargePaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
