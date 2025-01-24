import { TestBed } from '@angular/core/testing';

import { AddeventshowService } from './addeventshow.service';

describe('AddeventshowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddeventshowService = TestBed.get(AddeventshowService);
    expect(service).toBeTruthy();
  });
});
