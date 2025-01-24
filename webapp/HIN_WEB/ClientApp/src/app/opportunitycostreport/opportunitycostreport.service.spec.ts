import { TestBed } from '@angular/core/testing';

import { OpportunitycostreportService } from './opportunitycostreport.service';

describe('OpportunitycostreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpportunitycostreportService = TestBed.get(OpportunitycostreportService);
    expect(service).toBeTruthy();
  });
});
