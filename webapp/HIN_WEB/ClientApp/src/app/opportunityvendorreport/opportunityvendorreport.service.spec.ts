import { TestBed } from '@angular/core/testing';

import { OpportunityvendorreportService } from './opportunityvendorreport.service';

describe('OpportunityvendorreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpportunityvendorreportService = TestBed.get(OpportunityvendorreportService);
    expect(service).toBeTruthy();
  });
});
