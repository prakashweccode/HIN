import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityPermissionComponent } from './securityPermission.component';

describe('SettingsComponent', () => {
  let component: SecurityPermissionComponent;
  let fixture: ComponentFixture<SecurityPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
