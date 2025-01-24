import { TestBed } from '@angular/core/testing';

import { CsvEntityMapperService } from './csv-entity-mapper.service';

describe('CsvEntityMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CsvEntityMapperService = TestBed.get(CsvEntityMapperService);
    expect(service).toBeTruthy();
  });
});
