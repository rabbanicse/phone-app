import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanPaymentSuccessComponent } from './scan-payment-success.component';

describe('ScanPaymentSuccessComponent', () => {
  let component: ScanPaymentSuccessComponent;
  let fixture: ComponentFixture<ScanPaymentSuccessComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanPaymentSuccessComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanPaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
