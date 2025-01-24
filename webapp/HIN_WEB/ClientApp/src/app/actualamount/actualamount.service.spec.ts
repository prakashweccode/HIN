import { TestBed } from '@angular/core/testing';

import { ActualamountService } from './actualamount.service';

describe('ActualamountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActualamountService = TestBed.get(ActualamountService);
    expect(service).toBeTruthy();
  });
});
