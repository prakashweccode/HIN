import { TestBed } from '@angular/core/testing';

import { AddeventreportService } from './addeventreport.service';

describe('AddeventreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddeventreportService = TestBed.get(AddeventreportService);
    expect(service).toBeTruthy();
  });
});
