import { TestBed } from '@angular/core/testing';

import { AddtemppatientService } from './addtemppatient.service';

describe('AddtemppatientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddtemppatientService = TestBed.get(AddtemppatientService);
    expect(service).toBeTruthy();
  });
});
