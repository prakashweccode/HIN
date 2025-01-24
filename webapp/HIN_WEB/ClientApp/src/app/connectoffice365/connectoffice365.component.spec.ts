import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Connectoffice365Component } from './connectoffice365.component';

describe('Connectoffice365Component', () => {
  let component: Connectoffice365Component;
  let fixture: ComponentFixture<Connectoffice365Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Connectoffice365Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Connectoffice365Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
