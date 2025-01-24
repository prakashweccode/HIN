import { TestBed } from '@angular/core/testing';

import { AddgroupService } from './addgroup.service';

describe('AddgroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddgroupService = TestBed.get(AddgroupService);
    expect(service).toBeTruthy();
  });
});
