import { TestBed } from '@angular/core/testing';

import { AddvendorService } from './addvendor.service';

describe('AddvendorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddvendorService = TestBed.get(AddvendorService);
    expect(service).toBeTruthy();
  });
});
