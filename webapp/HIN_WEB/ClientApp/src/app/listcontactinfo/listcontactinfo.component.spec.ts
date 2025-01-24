import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcontactinfoComponent } from './listcontactinfo.component';

describe('ListcontactinfoComponent', () => {
  let component: ListcontactinfoComponent;
  let fixture: ComponentFixture<ListcontactinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcontactinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcontactinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
