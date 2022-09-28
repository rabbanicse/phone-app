import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeneficiaryAccountAddComponent } from './beneficiary-account-add.component';

describe('BeneficiaryAccountAddComponent', () => {
  let component: BeneficiaryAccountAddComponent;
  let fixture: ComponentFixture<BeneficiaryAccountAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiaryAccountAddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeneficiaryAccountAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
