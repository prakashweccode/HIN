import { TestBed } from '@angular/core/testing';

import { AdddealsService } from './adddeals.service';

describe('AdddealsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdddealsService = TestBed.get(AdddealsService);
    expect(service).toBeTruthy();
  });
});
