import { TestBed } from '@angular/core/testing';

import { ListvendorService } from './listvendor.service';

describe('ListvendorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListvendorService = TestBed.get(ListvendorService);
    expect(service).toBeTruthy();
  });
});
