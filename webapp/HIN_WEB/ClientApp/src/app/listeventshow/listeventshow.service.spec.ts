import { TestBed } from '@angular/core/testing';

import { ListeventshowService } from './listeventshow.service';

describe('ListeventshowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListeventshowService = TestBed.get(ListeventshowService);
    expect(service).toBeTruthy();
  });
});
