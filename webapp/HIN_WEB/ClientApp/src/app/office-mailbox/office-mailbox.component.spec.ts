import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeMailboxComponent } from './office-mailbox.component';

describe('OfficeMailboxComponent', () => {
  let component: OfficeMailboxComponent;
  let fixture: ComponentFixture<OfficeMailboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeMailboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeMailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
