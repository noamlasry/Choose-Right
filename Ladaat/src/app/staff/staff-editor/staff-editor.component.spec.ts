import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffEditorComponent } from './staff-editor.component';

describe('StaffEditorComponent', () => {
  let component: StaffEditorComponent;
  let fixture: ComponentFixture<StaffEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
