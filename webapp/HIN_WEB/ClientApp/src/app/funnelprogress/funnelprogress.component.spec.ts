import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelprogressComponent } from './funnelprogress.component';

describe('FunnelprogressComponent', () => {
  let component: FunnelprogressComponent;
  let fixture: ComponentFixture<FunnelprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
