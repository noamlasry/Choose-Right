import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEditorComponent } from './member-editor.component';

describe('MemberEditorComponent', () => {
  let component: MemberEditorComponent;
  let fixture: ComponentFixture<MemberEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
