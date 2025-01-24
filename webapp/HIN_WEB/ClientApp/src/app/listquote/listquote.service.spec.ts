import { TestBed } from '@angular/core/testing';

import { ListquoteService } from './listquote.service';

describe('ListquoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListquoteService = TestBed.get(ListquoteService);
    expect(service).toBeTruthy();
  });
});
