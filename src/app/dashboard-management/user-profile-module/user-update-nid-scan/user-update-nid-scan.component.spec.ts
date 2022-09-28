import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserUpdateNidScanComponent } from './user-update-nid-scan.component';

describe('UserUpdateNidScanComponent', () => {
  let component: UserUpdateNidScanComponent;
  let fixture: ComponentFixture<UserUpdateNidScanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUpdateNidScanComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserUpdateNidScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
