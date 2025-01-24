import { TestBed } from '@angular/core/testing';

import { PrimarycontactService } from './primarycontact.service';

describe('PrimarycontactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrimarycontactService = TestBed.get(PrimarycontactService);
    expect(service).toBeTruthy();
  });
});
