import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRequestFriendMainComponent } from './my-request-friend-main.component';

describe('MyRequestFriendMainComponent', () => {
  let component: MyRequestFriendMainComponent;
  let fixture: ComponentFixture<MyRequestFriendMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRequestFriendMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRequestFriendMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
