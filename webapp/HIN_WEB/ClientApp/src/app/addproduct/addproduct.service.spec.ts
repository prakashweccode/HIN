import { TestBed } from '@angular/core/testing';

import { AddproductService } from './addproduct.service';

describe('AddproductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddproductService = TestBed.get(AddproductService);
    expect(service).toBeTruthy();
  });
});
