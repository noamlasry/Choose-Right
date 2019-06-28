import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffBarComponent } from './staff-bar.component';

describe('StaffBarComponent', () => {
  let component: StaffBarComponent;
  let fixture: ComponentFixture<StaffBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
