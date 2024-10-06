import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSideBarItemComponent } from './right-side-bar-item.component';

describe('RightSideBarItemComponent', () => {
  let component: RightSideBarItemComponent;
  let fixture: ComponentFixture<RightSideBarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightSideBarItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightSideBarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
