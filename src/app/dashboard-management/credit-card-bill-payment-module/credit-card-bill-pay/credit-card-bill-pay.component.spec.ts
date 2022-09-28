import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreditCardBillPayComponent } from './credit-card-bill-pay.component';

describe('CreditCardBillPayComponent', () => {
  let component: CreditCardBillPayComponent;
  let fixture: ComponentFixture<CreditCardBillPayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditCardBillPayComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditCardBillPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
