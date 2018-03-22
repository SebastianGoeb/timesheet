import {Injectable} from '@angular/core';
import {WorkUnit} from "../../models/work-unit";

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {WorkUnitBackendService} from "./work-unit-backend.service";

@Injectable()
export class WorkUnitStore {

  private _workUnits$: BehaviorSubject<WorkUnit[]> = new BehaviorSubject([]);

  public readonly workUnits$: Observable<WorkUnit[]> = this._workUnits$.asObservable();

  constructor(private workUnitBackendService: WorkUnitBackendService) {
    // Load initial data
    this._workUnits$.next(this.workUnitBackendService.getAll());
  }

  public addWorkUnit(newWorkUnit: WorkUnit): Observable<WorkUnit> {
    let obs: Observable<WorkUnit> = this.workUnitBackendService.saveWorkUnit(newWorkUnit);

    obs.subscribe(res => {
      this._workUnits$.getValue().push(newWorkUnit);
      this._workUnits$.next(this._workUnits$.getValue());
    });

    return obs;
  }
}
