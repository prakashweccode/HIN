import { TestBed } from '@angular/core/testing';

import { OpportunityviewService } from './opportunityview.service';

describe('OpportunityviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpportunityviewService = TestBed.get(OpportunityviewService);
    expect(service).toBeTruthy();
  });
});
