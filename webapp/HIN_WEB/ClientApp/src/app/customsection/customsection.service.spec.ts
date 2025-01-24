import { TestBed } from '@angular/core/testing';

import { CustomsectionService } from './customsection.service';

describe('CustomsectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomsectionService = TestBed.get(CustomsectionService);
    expect(service).toBeTruthy();
  });
});
