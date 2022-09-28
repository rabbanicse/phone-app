import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PromotionalOfferComponent } from './promotional-offer.component';

describe('PromotionalOfferComponent', () => {
  let component: PromotionalOfferComponent;
  let fixture: ComponentFixture<PromotionalOfferComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionalOfferComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionalOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
