import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingEditorComponent } from './listing-editor.component';

describe('ListingEditorComponent', () => {
  let component: ListingEditorComponent;
  let fixture: ComponentFixture<ListingEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
