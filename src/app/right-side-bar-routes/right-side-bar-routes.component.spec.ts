import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSideBarRoutesComponent } from './right-side-bar-routes.component';

describe('RightSideBarRoutesComponent', () => {
  let component: RightSideBarRoutesComponent;
  let fixture: ComponentFixture<RightSideBarRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightSideBarRoutesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightSideBarRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
