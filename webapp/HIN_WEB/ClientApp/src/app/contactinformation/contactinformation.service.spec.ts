import { TestBed } from '@angular/core/testing';

import { ContactinformationService } from './contactinformation.service';

describe('ContactinformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactinformationService = TestBed.get(ContactinformationService);
    expect(service).toBeTruthy();
  });
});
