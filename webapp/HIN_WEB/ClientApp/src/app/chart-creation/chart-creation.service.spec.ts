import { TestBed } from '@angular/core/testing';

import { ChartCreationService } from './chart-creation.service';

describe('ChartCreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartCreationService = TestBed.get(ChartCreationService);
    expect(service).toBeTruthy();
  });
});
