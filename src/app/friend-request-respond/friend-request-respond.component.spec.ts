import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestRespondComponent } from './friend-request-respond.component';

describe('FriendRequestRespondComponent', () => {
  let component: FriendRequestRespondComponent;
  let fixture: ComponentFixture<FriendRequestRespondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendRequestRespondComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendRequestRespondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
