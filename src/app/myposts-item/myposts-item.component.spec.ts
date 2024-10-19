import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypostsItemComponent } from './myposts-item.component';

describe('MypostsItemComponent', () => {
  let component: MypostsItemComponent;
  let fixture: ComponentFixture<MypostsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MypostsItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MypostsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
