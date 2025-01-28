import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicformmedicalassociatesComponent } from './basicformmedicalassociates.component';

describe('BasicformmedicalassociatesComponent', () => {
  let component: BasicformmedicalassociatesComponent;
  let fixture: ComponentFixture<BasicformmedicalassociatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicformmedicalassociatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicformmedicalassociatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
