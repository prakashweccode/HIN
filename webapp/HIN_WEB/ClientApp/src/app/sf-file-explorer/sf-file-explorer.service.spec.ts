import { TestBed } from '@angular/core/testing';

import { SfFileExplorerService } from './sf-file-explorer.service';

describe('SfFileExplorerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SfFileExplorerService = TestBed.get(SfFileExplorerService);
    expect(service).toBeTruthy();
  });
});
