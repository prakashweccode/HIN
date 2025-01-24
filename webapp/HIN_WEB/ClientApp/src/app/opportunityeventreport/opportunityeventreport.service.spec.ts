import { TestBed } from '@angular/core/testing';

import { OpportunityeventreportService } from './opportunityeventreport.service';

describe('OpportunityeventreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpportunityeventreportService = TestBed.get(OpportunityeventreportService);
    expect(service).toBeTruthy();
  });
});
