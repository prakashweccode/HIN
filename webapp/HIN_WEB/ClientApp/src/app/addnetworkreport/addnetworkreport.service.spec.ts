import { TestBed } from '@angular/core/testing';

import { AddnetworkreportService } from './addnetworkreport.service';

describe('AddnetworkreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddnetworkreportService = TestBed.get(AddnetworkreportService);
    expect(service).toBeTruthy();
  });
});
