import { TestBed } from '@angular/core/testing';

import { ListreferralService } from './listreferral.service';

describe('ListreferralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListreferralService = TestBed.get(ListreferralService);
    expect(service).toBeTruthy();
  });
});
