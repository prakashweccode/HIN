import { TestBed } from '@angular/core/testing';

import { AddreferralService } from './addreferral.service';

describe('AddreferralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddreferralService = TestBed.get(AddreferralService);
    expect(service).toBeTruthy();
  });
});
