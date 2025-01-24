import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnedriveConnectComponent } from './onedrive-connect.component';

describe('OnedriveConnectComponent', () => {
  let component: OnedriveConnectComponent;
  let fixture: ComponentFixture<OnedriveConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnedriveConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnedriveConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
