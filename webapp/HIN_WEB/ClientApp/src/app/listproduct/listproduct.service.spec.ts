import { TestBed } from '@angular/core/testing';

import { ListproductService } from './listproduct.service';

describe('ListproductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListproductService = TestBed.get(ListproductService);
    expect(service).toBeTruthy();
  });
});
