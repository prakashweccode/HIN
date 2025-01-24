import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsclosedbyrepComponent } from './proposalsclosedbyrep.component';

describe('ProposalsclosedbyrepComponent', () => {
  let component: ProposalsclosedbyrepComponent;
  let fixture: ComponentFixture<ProposalsclosedbyrepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalsclosedbyrepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalsclosedbyrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
