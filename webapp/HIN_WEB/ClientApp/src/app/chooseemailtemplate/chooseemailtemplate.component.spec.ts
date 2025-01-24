import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseemailtemplateComponent } from './chooseemailtemplate.component';

describe('ChooseemailtemplateComponent', () => {
  let component: ChooseemailtemplateComponent;
  let fixture: ComponentFixture<ChooseemailtemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseemailtemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseemailtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
