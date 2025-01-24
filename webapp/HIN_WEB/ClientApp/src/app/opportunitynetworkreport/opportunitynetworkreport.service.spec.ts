import { TestBed } from '@angular/core/testing';

import { OpportunitynetworkreportService } from './opportunitynetworkreport.service';

describe('OpportunitynetworkreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpportunitynetworkreportService = TestBed.get(OpportunitynetworkreportService);
    expect(service).toBeTruthy();
  });
});
