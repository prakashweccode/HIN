import { TestBed } from '@angular/core/testing';

import { ListdealsService } from './listdeals.service';

describe('ListdealsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListdealsService = TestBed.get(ListdealsService);
    expect(service).toBeTruthy();
  });
});
