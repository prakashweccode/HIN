import { TestBed } from '@angular/core/testing';

import { OutlookMailService } from './outlook-mail.service';

describe('OutlookMailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutlookMailService = TestBed.get(OutlookMailService);
    expect(service).toBeTruthy();
  });
});
