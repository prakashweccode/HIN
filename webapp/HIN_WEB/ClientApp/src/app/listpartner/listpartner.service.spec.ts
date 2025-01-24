import { TestBed } from '@angular/core/testing';

import { ListpartnerService } from './listpartner.service';

describe('ListpartnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListpartnerService = TestBed.get(ListpartnerService);
    expect(service).toBeTruthy();
  });
});
