import { TestBed } from '@angular/core/testing';

import { OnedrivegraphAuthService } from './onedrivegraph-auth.service';

describe('OnedrivegraphAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnedrivegraphAuthService = TestBed.get(OnedrivegraphAuthService);
    expect(service).toBeTruthy();
  });
});
