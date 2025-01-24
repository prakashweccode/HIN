import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesinfoComponent } from './notesinfo.component';

describe('NotesinfoComponent', () => {
  let component: NotesinfoComponent;
  let fixture: ComponentFixture<NotesinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
