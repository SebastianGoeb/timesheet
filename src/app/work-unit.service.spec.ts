import { TestBed, inject } from '@angular/core/testing';

import { WorkUnitStore } from './work-unit.service';

describe('WorkUnitStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkUnitStore]
    });
  });

  it('should be created', inject([WorkUnitStore], (service: WorkUnitStore) => {
    expect(service).toBeTruthy();
  }));
});
