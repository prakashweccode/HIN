import { TestBed } from '@angular/core/testing';

import { ListnetworkingService } from './listnetworking.service';

describe('ListnetworkingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListnetworkingService = TestBed.get(ListnetworkingService);
    expect(service).toBeTruthy();
  });
});
