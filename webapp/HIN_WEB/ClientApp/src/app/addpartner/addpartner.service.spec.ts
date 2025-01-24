import { TestBed } from '@angular/core/testing';

import { AddpartnerService } from './addpartner.service';

describe('AddpartnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddpartnerService = TestBed.get(AddpartnerService);
    expect(service).toBeTruthy();
  });
});
