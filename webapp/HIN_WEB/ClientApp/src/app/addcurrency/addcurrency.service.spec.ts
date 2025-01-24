import { TestBed } from '@angular/core/testing';

import { AddcurrencyService } from './addcurrency.service';

describe('AddcurrencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddcurrencyService = TestBed.get(AddcurrencyService);
    expect(service).toBeTruthy();
  });
});
