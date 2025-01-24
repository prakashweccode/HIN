import { TestBed } from '@angular/core/testing';

import { CustomdropdownService } from './customdropdown.service';

describe('CustomdropdownService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomdropdownService = TestBed.get(CustomdropdownService);
    expect(service).toBeTruthy();
  });
});
