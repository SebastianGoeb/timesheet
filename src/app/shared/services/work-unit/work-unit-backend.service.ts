import {Injectable} from '@angular/core';
import {WorkUnit} from "../../models/work-unit";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";

const KEY_WORK_UNITS = "dateInfos";
const DEFAULT_WORK_UNITS = [];

@Injectable()
export class WorkUnitBackendService {

  constructor() {
  }

  private static readFromLocalStorage(): WorkUnit[] {
    const value = localStorage.getItem(KEY_WORK_UNITS);

    if (!value) {
      return DEFAULT_WORK_UNITS;
    }

    return JSON.parse(value)
      .map(workUnit => new WorkUnit(workUnit));
  }

  private static writeToLocalStorage(workUnits: WorkUnit[]): void {
    localStorage.setItem(KEY_WORK_UNITS, JSON.stringify(workUnits));
  }

  getAll(): WorkUnit[] {
    return WorkUnitBackendService.readFromLocalStorage();
  }

  addWorkUnit(newWorkUnit: WorkUnit): Observable<WorkUnit> {
    const workUnits: WorkUnit[] = WorkUnitBackendService.readFromLocalStorage();
    workUnits.push(newWorkUnit);
    WorkUnitBackendService.writeToLocalStorage(workUnits);
    return of(newWorkUnit);
  }

  updateWorkUnit(newWorkUnit: WorkUnit): Observable<WorkUnit[]> {
    const workUnits: WorkUnit[] = WorkUnitBackendService.readFromLocalStorage()
      .map(w => {
        if (w.start.startOf('day').isSame(newWorkUnit.start.startOf('day'))) {
          return newWorkUnit;
        } else {
          return w;
        }
      });
    WorkUnitBackendService.writeToLocalStorage(workUnits);
    return of(workUnits);
  }
}
