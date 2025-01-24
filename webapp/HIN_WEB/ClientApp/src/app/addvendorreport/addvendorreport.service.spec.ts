import { TestBed } from '@angular/core/testing';

import { AddvendorreportService } from './addvendorreport.service';

describe('AddvendorreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddvendorreportService = TestBed.get(AddvendorreportService);
    expect(service).toBeTruthy();
  });
});
