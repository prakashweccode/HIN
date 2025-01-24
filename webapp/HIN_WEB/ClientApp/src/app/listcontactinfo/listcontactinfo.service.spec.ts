import { TestBed } from '@angular/core/testing';

import { ListcontactinfoService } from './listcontactinfo.service';

describe('ListcontactinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListcontactinfoService = TestBed.get(ListcontactinfoService);
    expect(service).toBeTruthy();
  });
});
