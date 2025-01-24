import { TestBed } from '@angular/core/testing';

import { DropdownOptionsService } from './dropdown-options.service';

describe('DropdownOptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DropdownOptionsService = TestBed.get(DropdownOptionsService);
    expect(service).toBeTruthy();
  });
});
