import { TestBed } from '@angular/core/testing';

import { CompanyregisterService } from './companyregister.service';

describe('CompanyregisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyregisterService = TestBed.get(CompanyregisterService);
    expect(service).toBeTruthy();
  });
});
