import { TestBed } from '@angular/core/testing';

import { OpportunityclosingreportService } from './opportunityclosingreport.service';

describe('OpportunityclosingreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpportunityclosingreportService = TestBed.get(OpportunityclosingreportService);
    expect(service).toBeTruthy();
  });
});
