import { TestBed } from '@angular/core/testing';

import { OpportunitypartnerreportService } from './opportunitypartnerreport.service';

describe('OpportunitypartnerreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpportunitypartnerreportService = TestBed.get(OpportunitypartnerreportService);
    expect(service).toBeTruthy();
  });
});
