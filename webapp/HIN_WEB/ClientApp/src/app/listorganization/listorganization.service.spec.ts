import { TestBed } from '@angular/core/testing';

import { ListorganizationService } from './listorganization.service';

describe('ListorganizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListorganizationService = TestBed.get(ListorganizationService);
    expect(service).toBeTruthy();
  });
});
