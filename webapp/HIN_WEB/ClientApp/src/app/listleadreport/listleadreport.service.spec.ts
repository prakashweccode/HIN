import { TestBed } from '@angular/core/testing';

import { ListleadreportService } from './listleadreport.service';

describe('ListleadreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListleadreportService = TestBed.get(ListleadreportService);
    expect(service).toBeTruthy();
  });
});
