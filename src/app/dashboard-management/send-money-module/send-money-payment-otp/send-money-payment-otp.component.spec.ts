import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendMoneyPaymentOtpComponent } from './send-money-payment-otp.component';

describe('SendMoneyPaymentOtpComponent', () => {
  let component: SendMoneyPaymentOtpComponent;
  let fixture: ComponentFixture<SendMoneyPaymentOtpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SendMoneyPaymentOtpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendMoneyPaymentOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
