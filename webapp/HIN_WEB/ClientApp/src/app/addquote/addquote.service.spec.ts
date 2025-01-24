import { TestBed } from '@angular/core/testing';

import { AddquoteService } from './addquote.service';

describe('AddquoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddquoteService = TestBed.get(AddquoteService);
    expect(service).toBeTruthy();
  });
});
