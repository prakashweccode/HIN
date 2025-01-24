import { TestBed } from '@angular/core/testing';

import { EmailtemplateService } from './emailtemplate.service';

describe('EmailtemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailtemplateService = TestBed.get(EmailtemplateService);
    expect(service).toBeTruthy();
  });
});
