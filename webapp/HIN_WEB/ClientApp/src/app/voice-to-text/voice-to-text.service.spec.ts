import { TestBed } from '@angular/core/testing';

import { VoiceToTextService } from './voice-to-text.service';

describe('VoiceToTextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoiceToTextService = TestBed.get(VoiceToTextService);
    expect(service).toBeTruthy();
  });
});
