import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDictationComponent } from './template-dictation.component';

describe('TemplateDictationComponent', () => {
  let component: TemplateDictationComponent;
  let fixture: ComponentFixture<TemplateDictationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDictationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDictationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
