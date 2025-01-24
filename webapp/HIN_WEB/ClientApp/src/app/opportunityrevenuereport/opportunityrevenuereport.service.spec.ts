import { TestBed } from '@angular/core/testing';

import { OpportunityrevenuereportService } from './opportunityrevenuereport.service';

describe('OpportunityrevenuereportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpportunityrevenuereportService = TestBed.get(OpportunityrevenuereportService);
    expect(service).toBeTruthy();
  });
});
