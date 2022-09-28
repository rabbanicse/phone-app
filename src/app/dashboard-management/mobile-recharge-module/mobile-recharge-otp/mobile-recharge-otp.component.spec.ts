import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileRechargeOtpComponent } from './mobile-recharge-otp.component';

describe('MobileRechargeOtpComponent', () => {
  let component: MobileRechargeOtpComponent;
  let fixture: ComponentFixture<MobileRechargeOtpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileRechargeOtpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileRechargeOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
