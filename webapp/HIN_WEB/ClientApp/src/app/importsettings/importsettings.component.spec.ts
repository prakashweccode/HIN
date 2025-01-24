import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportsettingsComponent } from './importsettings.component';

describe('ImportsettingsComponent', () => {
  let component: ImportsettingsComponent;
  let fixture: ComponentFixture<ImportsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
