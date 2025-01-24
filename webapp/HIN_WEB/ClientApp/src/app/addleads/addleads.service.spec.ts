import { TestBed } from '@angular/core/testing';

import { AddleadsService } from './addleads.service';

describe('AddleadsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddleadsService = TestBed.get(AddleadsService);
    expect(service).toBeTruthy();
  });
});
