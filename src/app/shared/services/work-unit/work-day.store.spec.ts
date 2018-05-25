import {inject, TestBed} from '@angular/core/testing';

import {WorkDayStore} from './work-day.store';

describe('WorkDayStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkDayStore]
    });
  });

  it('should be created', inject([WorkDayStore], (service: WorkDayStore) => {
    expect(service).toBeTruthy();
  }));
});
