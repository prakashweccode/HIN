import { TestBed } from '@angular/core/testing';

import { CategorylistService } from './categorylist.service';

describe('CategorylistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategorylistService = TestBed.get(CategorylistService);
    expect(service).toBeTruthy();
  });
});
