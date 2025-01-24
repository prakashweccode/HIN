import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitieslostbyreasonComponent } from './opportunitieslostbyreason.component';

describe('OpportunitieslostbyreasonComponent', () => {
  let component: OpportunitieslostbyreasonComponent;
  let fixture: ComponentFixture<OpportunitieslostbyreasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitieslostbyreasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitieslostbyreasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
