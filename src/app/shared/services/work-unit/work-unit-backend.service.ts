import { Injectable } from '@angular/core';
import {WorkUnit} from "../../models/work-unit";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";

const KEY_WORK_UNITS = "workUnits";
const DEFAULT_WORK_UNITS = [];

@Injectable()
export class WorkUnitBackendService {

  constructor() { }

  getAll(): WorkUnit[] {
    return WorkUnitBackendService.readFromLocalStorage();
  }

  saveWorkUnit(newWorkUnit: WorkUnit): Observable<WorkUnit> {
    let list: WorkUnit[] = WorkUnitBackendService.readFromLocalStorage();
    list.push(newWorkUnit);
    WorkUnitBackendService.writeToLocalStorage(list);
    return of(newWorkUnit);
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
}
