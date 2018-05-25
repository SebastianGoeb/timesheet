import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {_throw} from 'rxjs/observable/throw';
import {WorkDay} from '../../models/work-day';


const KEY_WORK_UNITS = 'workDays';

@Injectable()
export class WorkDayService {

  constructor() {
  }

  private static readFromLocalStorage(): WorkDay[] {
    const jsonString = localStorage.getItem(KEY_WORK_UNITS);

    if (jsonString == undefined) {
      return [];
    }

    return JSON.parse(jsonString)
      .map(json => WorkDay.fromJSON(json));
  }

  private static writeToLocalStorage(workDays: WorkDay[]): void {
    const json = workDays.map(workDay => WorkDay.toJSON(workDay));

    localStorage.setItem(KEY_WORK_UNITS, JSON.stringify(json));
  }

  // noinspection JSMethodCanBeStatic
  public getAll(): Observable<WorkDay[]> {
    const workDays = WorkDayService.readFromLocalStorage();

    return of(workDays);
  }

  public addWorkDay(newWorkDay: WorkDay): Observable<WorkDay> {
    const workDays = WorkDayService.readFromLocalStorage();

    // Validate add operation is allowed
    const existingWorkDay = workDays.find(workDay => workDay.date.equals(newWorkDay.date));
    if (existingWorkDay) {
      return _throw({message: 'Unable to add work day. There is already a work day saved for this date. Update existing work day instead.'});
    }

    const updatedWorkDays = workDays.concat([newWorkDay]);
    WorkDayService.writeToLocalStorage(updatedWorkDays);

    return of(newWorkDay);
  }

  public updateWorkDay(newWorkDay: WorkDay): Observable<WorkDay> {
    const workDays: WorkDay[] = WorkDayService.readFromLocalStorage();

    // Validate update operation is allowed
    const existingWorkDay = workDays.find(workDay => workDay.date.equals(newWorkDay.date));
    if (existingWorkDay == undefined) {
      return _throw({message: 'Unable to update work day. There is no work day saved for this date. Add work day instead.'});
    }

    const updatedWorkDays = workDays
      .map(workDay => workDay.date.equals(newWorkDay.date) ? newWorkDay : workDay);
    WorkDayService.writeToLocalStorage(updatedWorkDays);

    return of(newWorkDay);
  }

  public removeWorkDay(workDayToRemove: WorkDay): Observable<WorkDay> {
    const workDays: WorkDay[] = WorkDayService.readFromLocalStorage();

    // Validate remove operation is allowed
    const existingWorkDay = workDays.find(workDay => workDay.date.equals(workDayToRemove.date));
    if (existingWorkDay == undefined) {
      return _throw({message: 'Unable to remove work day. There is no work day saved for this date.'});
    }

    const updatedWorkDays = workDays
      .filter(workDay => !workDay.date.equals(workDayToRemove.date));
    WorkDayService.writeToLocalStorage(updatedWorkDays);

    return of(workDayToRemove);
  }
}
