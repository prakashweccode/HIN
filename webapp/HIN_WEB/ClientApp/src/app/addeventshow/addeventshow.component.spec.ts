import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeventshowComponent } from './addeventshow.component';

describe('AddeventshowComponent', () => {
  let component: AddeventshowComponent;
  let fixture: ComponentFixture<AddeventshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeventshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeventshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
