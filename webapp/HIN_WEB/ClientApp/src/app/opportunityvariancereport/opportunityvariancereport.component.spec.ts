import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityvariancereportComponent } from './opportunityvariancereport.component';

describe('OpportunityvariancereportComponent', () => {
  let component: OpportunityvariancereportComponent;
  let fixture: ComponentFixture<OpportunityvariancereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityvariancereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityvariancereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
