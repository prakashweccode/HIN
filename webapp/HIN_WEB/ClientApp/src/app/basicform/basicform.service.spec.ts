import { TestBed } from '@angular/core/testing';

import { BasicformService } from './basicform.service';

describe('BasicformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicformService = TestBed.get(BasicformService);
    expect(service).toBeTruthy();
  });
});
