import { TestBed } from '@angular/core/testing';

import { EditcolumnService } from './editcolumn.service';

describe('EditcolumnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditcolumnService = TestBed.get(EditcolumnService);
    expect(service).toBeTruthy();
  });
});
