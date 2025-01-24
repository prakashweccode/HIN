import { TestBed } from '@angular/core/testing';

import { ReportSettingsService } from './report-settings.service';

describe('ReportSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportSettingsService = TestBed.get(ReportSettingsService);
    expect(service).toBeTruthy();
  });
});
