import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRquestItemComponent } from './friend-rquest-item.component';

describe('FriendRquestItemComponent', () => {
  let component: FriendRquestItemComponent;
  let fixture: ComponentFixture<FriendRquestItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendRquestItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendRquestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
