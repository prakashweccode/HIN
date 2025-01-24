import { TestBed } from '@angular/core/testing';

import { AddorganizationService } from './addorganization.service';

describe('AddorganizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddorganizationService = TestBed.get(AddorganizationService);
    expect(service).toBeTruthy();
  });
});
