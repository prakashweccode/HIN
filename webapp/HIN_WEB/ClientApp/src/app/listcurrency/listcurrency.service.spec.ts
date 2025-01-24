import { TestBed } from '@angular/core/testing';

import { ListcurrencyService } from './listcurrency.service';

describe('ListcurrencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListcurrencyService = TestBed.get(ListcurrencyService);
    expect(service).toBeTruthy();
  });
});
