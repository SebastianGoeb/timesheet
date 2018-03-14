import {Component, OnInit} from '@angular/core';
import {WorkUnitStore} from "../work-unit.service";
import * as moment from 'moment';
import {WorkUnit} from "../work-unit";
import {Observable} from "rxjs/Observable";
import {combineLatest, map} from "rxjs/operators";
import {BehaviorSubject} from "rxjs/BehaviorSubject";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentMonth$: BehaviorSubject<moment.Moment>;

  workUnits$: Observable<WorkUnit[]>;

  constructor(private workUnitStore: WorkUnitStore) {
    this.currentMonth$ = new BehaviorSubject(moment().startOf('month'));

    this.workUnits$ = this.workUnitStore.workUnits$.pipe(
      combineLatest(this.currentMonth$, (workUnits: WorkUnit[], month: moment.Moment) => ({workUnits, month})),
      map(({workUnits, month}) => workUnits.filter(
        workUnit => workUnit.start.startOf('month').isSame(month)
      ))
    );
  }

  ngOnInit() {
  }

  addWorkUnit() {
    this.workUnitStore.addWorkUnit({
      id: null,
      start: moment(),
      end: moment(),
      breakDuration: moment.duration(123456789)
    })
  }

  decrementMonth() {
    this.currentMonth$.next(this.currentMonth$.getValue().subtract(1, 'month'));
  }

  incrementMonth() {
    this.currentMonth$.next(this.currentMonth$.getValue().add(1, 'month'));
  }
}
