import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VwcontactlistComponent } from './vwcontactlist.component';

describe('VwcontactlistComponent', () => {
  let component: VwcontactlistComponent;
  let fixture: ComponentFixture<VwcontactlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VwcontactlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VwcontactlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
