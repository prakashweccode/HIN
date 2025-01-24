import { TestBed } from '@angular/core/testing';

import { AddnetworkingService } from './addnetworking.service';

describe('AddnetworkingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddnetworkingService = TestBed.get(AddnetworkingService);
    expect(service).toBeTruthy();
  });
});
