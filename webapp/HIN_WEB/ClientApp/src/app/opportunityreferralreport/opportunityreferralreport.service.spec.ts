import { TestBed } from '@angular/core/testing';

import { OpportunityreferralreportService } from './opportunityreferralreport.service';

describe('OpportunityreferralreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpportunityreferralreportService = TestBed.get(OpportunityreferralreportService);
    expect(service).toBeTruthy();
  });
});
