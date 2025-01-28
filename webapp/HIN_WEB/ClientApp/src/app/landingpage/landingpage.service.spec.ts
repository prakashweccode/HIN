import { TestBed } from '@angular/core/testing';

import { LandingpageService } from './landingpage.service';

describe('LandingpageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LandingpageService = TestBed.get(LandingpageService);
    expect(service).toBeTruthy();
  });
});
