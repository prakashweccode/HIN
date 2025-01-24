import { TestBed } from '@angular/core/testing';

import { NewcalendarService } from './newcalendar.service';

describe('NewCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewcalendarService = TestBed.get(NewcalendarService);
    expect(service).toBeTruthy();
  });
});
