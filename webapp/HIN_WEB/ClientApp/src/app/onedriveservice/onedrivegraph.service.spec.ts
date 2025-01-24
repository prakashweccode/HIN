import { TestBed } from '@angular/core/testing';

import { OnedrivegraphService } from './onedrivegraph.service';

describe('OnedrivegraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnedrivegraphService = TestBed.get(OnedrivegraphService);
    expect(service).toBeTruthy();
  });
});
