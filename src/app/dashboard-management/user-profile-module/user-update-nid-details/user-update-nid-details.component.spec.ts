import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserUpdateNidDetailsComponent } from './user-update-nid-details.component';

describe('UserUpdateNidDetailsComponent', () => {
  let component: UserUpdateNidDetailsComponent;
  let fixture: ComponentFixture<UserUpdateNidDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUpdateNidDetailsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserUpdateNidDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
