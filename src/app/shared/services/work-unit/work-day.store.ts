import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {WorkDayService} from './work-day.service';
import {WorkDay} from '../../models/work-day';

@Injectable()
export class WorkDayStore {

  private _workDays: BehaviorSubject<WorkDay[]> = new BehaviorSubject([]);

  public readonly workDays: Observable<WorkDay[]> = this._workDays.asObservable();

  constructor(private workDayService: WorkDayService) {
    this.getAll(); // Initial setup
  }

  public getAll(): Observable<WorkDay[]> {
    const obs = this.workDayService.getAll();

    obs.subscribe(
      workDays => this._workDays.next(workDays),
      err => console.warn(err)
    );

    return obs;
  }

  public addWorkDay(newWorkDay: WorkDay): Observable<WorkDay> {
    const obs: Observable<WorkDay> = this.workDayService.addWorkDay(newWorkDay);

    obs.subscribe(
      savedWorkDay => {
        const updatedWorkDays = this._workDays.getValue().concat([savedWorkDay]);
        this._workDays.next(updatedWorkDays);
      },
      err => console.warn(err.message)
    );

    return obs;
  }

  public updateWorkDay(newWorkDay: WorkDay): Observable<WorkDay> {
    const obs: Observable<WorkDay> = this.workDayService.updateWorkDay(newWorkDay);

    obs.subscribe(
      savedWorkDay => {
        const updatedWorkDays = this._workDays.getValue()
          .map(workDay => workDay.date.isEqual(savedWorkDay.date) ? savedWorkDay : workDay);
        this._workDays.next(updatedWorkDays);
      },
      err => console.warn(err.message));

    return obs;
  }
}
