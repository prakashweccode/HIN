import { TestBed } from '@angular/core/testing';

import { AddeventService } from './addevent.service';

describe('AddeventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddeventService = TestBed.get(AddeventService);
    expect(service).toBeTruthy();
  });
});
