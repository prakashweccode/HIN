import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WondealsbyrepComponent } from './wondealsbyrep.component';

describe('WondealsbyrepComponent', () => {
  let component: WondealsbyrepComponent;
  let fixture: ComponentFixture<WondealsbyrepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WondealsbyrepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WondealsbyrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
