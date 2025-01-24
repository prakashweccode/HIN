import { TestBed } from '@angular/core/testing';

import { SecurityPermissionService } from './securityPermission.service';

describe('SettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecurityPermissionService = TestBed.get(SecurityPermissionService);
    expect(service).toBeTruthy();
  });
});
