import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCreationComponent } from './chart-creation.component';

describe('ChartCreationComponent', () => {
  let component: ChartCreationComponent;
  let fixture: ComponentFixture<ChartCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
