import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestMainComponent } from './friend-request-main.component';

describe('FriendRequestMainComponent', () => {
  let component: FriendRequestMainComponent;
  let fixture: ComponentFixture<FriendRequestMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendRequestMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendRequestMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
