import { TestBed } from '@angular/core/testing';

import { ListpartcatalogService } from './listpartcatalog.service';

describe('ListpartcatalogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListpartcatalogService = TestBed.get(ListpartcatalogService);
    expect(service).toBeTruthy();
  });
});
