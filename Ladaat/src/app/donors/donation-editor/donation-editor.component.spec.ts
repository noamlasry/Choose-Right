import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationEditorComponent } from './donation-editor.component';

describe('DonationComponent', () => {
  let component: DonationEditorComponent;
  let fixture: ComponentFixture<DonationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
