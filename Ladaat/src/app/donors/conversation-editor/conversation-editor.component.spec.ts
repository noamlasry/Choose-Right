import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationEditorComponent } from './conversation-editor.component';

describe('ConversationEditorComponent', () => {
  let component: ConversationEditorComponent;
  let fixture: ComponentFixture<ConversationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
