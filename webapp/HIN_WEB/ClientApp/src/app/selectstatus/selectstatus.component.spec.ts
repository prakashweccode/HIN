import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectstatusComponent } from './selectstatus.component';

describe('SelectstatusComponent', () => {
  let component: SelectstatusComponent;
  let fixture: ComponentFixture<SelectstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
