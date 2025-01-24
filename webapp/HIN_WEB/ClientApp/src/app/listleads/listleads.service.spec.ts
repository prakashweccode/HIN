import { TestBed } from '@angular/core/testing';

import { ListleadsService } from './listleads.service';

describe('ListleadsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListleadsService = TestBed.get(ListleadsService);
    expect(service).toBeTruthy();
  });
});
