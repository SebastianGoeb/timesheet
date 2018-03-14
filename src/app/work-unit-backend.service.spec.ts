import { TestBed, inject } from '@angular/core/testing';

import { WorkUnitBackendService } from './work-unit-backend.service';

describe('WorkUnitBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkUnitBackendService]
    });
  });

  it('should be created', inject([WorkUnitBackendService], (service: WorkUnitBackendService) => {
    expect(service).toBeTruthy();
  }));
});
