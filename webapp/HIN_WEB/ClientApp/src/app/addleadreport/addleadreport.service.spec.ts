import { TestBed } from '@angular/core/testing';

import { AddleadreportService } from './addleadreport.service';

describe('AddleadreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddleadreportService = TestBed.get(AddleadreportService);
    expect(service).toBeTruthy();
  });
});
