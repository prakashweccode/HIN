import { TestBed } from '@angular/core/testing';

import { AdddealreportService } from './adddealreport.service';

describe('AdddealreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdddealreportService = TestBed.get(AdddealreportService);
    expect(service).toBeTruthy();
  });
});
