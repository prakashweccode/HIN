import { TestBed } from '@angular/core/testing';

import { CurrencyyService } from './currencyy.service';

describe('CurrencyyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyyService = TestBed.get(CurrencyyService);
    expect(service).toBeTruthy();
  });
});
