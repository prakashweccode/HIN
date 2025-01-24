import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyuserComponent } from './companyuser.component';

describe('CompanyuserComponent', () => {
  let component: CompanyuserComponent;
  let fixture: ComponentFixture<CompanyuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
