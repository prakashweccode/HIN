import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularGoogleChartsComponent } from './angular-google-charts.component';

describe('GoogleChartsComponent', () => {
  let component: AngularGoogleChartsComponent;
  let fixture: ComponentFixture<AngularGoogleChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularGoogleChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularGoogleChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
