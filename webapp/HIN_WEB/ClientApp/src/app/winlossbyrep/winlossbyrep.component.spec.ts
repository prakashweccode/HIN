import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinlossbyrepComponent } from './winlossbyrep.component';

describe('WinlossbyrepComponent', () => {
  let component: WinlossbyrepComponent;
  let fixture: ComponentFixture<WinlossbyrepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinlossbyrepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinlossbyrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
