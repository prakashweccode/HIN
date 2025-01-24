import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityclosingreportComponent } from './opportunityclosingreport.component';

describe('OpportunityclosingreportComponent', () => {
  let component: OpportunityclosingreportComponent;
  let fixture: ComponentFixture<OpportunityclosingreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityclosingreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityclosingreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
