import { TestBed } from '@angular/core/testing';

import { AddpartcatalogService } from './addpartcatalog.service';

describe('AddpartcatalogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddpartcatalogService = TestBed.get(AddpartcatalogService);
    expect(service).toBeTruthy();
  });
});
