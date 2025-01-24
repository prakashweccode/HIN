import { TestBed } from '@angular/core/testing';

import { NotesinfoService } from './notesinfo.service';

describe('NotesinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotesinfoService = TestBed.get(NotesinfoService);
    expect(service).toBeTruthy();
  });
});
