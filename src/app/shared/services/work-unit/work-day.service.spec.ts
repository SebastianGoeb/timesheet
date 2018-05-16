import {inject, TestBed} from '@angular/core/testing';

import {WorkDayService} from './work-day.service';

describe('WorkDayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkDayService]
    });
  });

  it('should be created', inject([WorkDayService], (service: WorkDayService) => {
    expect(service).toBeTruthy();
  }));
});
