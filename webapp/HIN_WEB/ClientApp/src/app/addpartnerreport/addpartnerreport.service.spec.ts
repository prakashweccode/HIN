import { TestBed } from '@angular/core/testing';

import { AddpartnerreportService } from './addpartnerreport.service';

describe('AddpartnerreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddpartnerreportService = TestBed.get(AddpartnerreportService);
    expect(service).toBeTruthy();
  });
});
