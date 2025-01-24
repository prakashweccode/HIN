import { TestBed } from '@angular/core/testing';

import { OnedriveExplorerService } from './onedrive-explorer.service';

describe('OnedriveExplorerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnedriveExplorerService = TestBed.get(OnedriveExplorerService);
    expect(service).toBeTruthy();
  });
});
