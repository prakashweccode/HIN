import { TestBed } from '@angular/core/testing';

import { SfcalendarService } from './sfcalendar.service';

describe('SfcalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SfcalendarService = TestBed.get(SfcalendarService);
    expect(service).toBeTruthy();
  });
});
