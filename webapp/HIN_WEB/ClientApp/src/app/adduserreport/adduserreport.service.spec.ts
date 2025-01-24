import { TestBed } from '@angular/core/testing';

import { AdduserreportService } from './adduserreport.service';

describe('AdduserreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdduserreportService = TestBed.get(AdduserreportService);
    expect(service).toBeTruthy();
  });
});
