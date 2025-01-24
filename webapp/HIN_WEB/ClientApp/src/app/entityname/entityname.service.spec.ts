import { TestBed } from '@angular/core/testing';

import { EntitynameService } from './entityname.service';

describe('EntitynameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntitynameService = TestBed.get(EntitynameService);
    expect(service).toBeTruthy();
  });
});
