import { TestBed } from '@angular/core/testing';

import { AssignedtogridService } from './assignedtogrid.service';

describe('AssignedtogridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignedtogridService = TestBed.get(AssignedtogridService);
    expect(service).toBeTruthy();
  });
});
