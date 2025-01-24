import { TestBed } from '@angular/core/testing';

import { AddreferralreportService } from './addreferralreport.service';

describe('AddreferralreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddreferralreportService = TestBed.get(AddreferralreportService);
    expect(service).toBeTruthy();
  });
});
