import {Component, OnInit} from '@angular/core';
import {combineLatest, map} from "rxjs/operators";
import {WorkUnit} from "../shared/models/work-unit";
import {Observable} from "rxjs/Observable";
import {WorkUnitStore} from "../shared/services/work-unit/work-unit.store";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import * as moment from "moment";
import * as _ from "lodash";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  month: BehaviorSubject<moment.Moment>;

  workUnits: Observable<{
    date: moment.Moment,
    start: string,
    end: string,
    breakDuration: string
  }[]>;

  datesInMonth: Observable<moment.Moment[]>;

  constructor(private workUnitStore: WorkUnitStore) {
    // Initialize month to current month
    this.month = new BehaviorSubject(moment().startOf('month'));

    this.datesInMonth = this.month.pipe(map(month => HistoryComponent.datesInMonth(month)));

    // Make a work unit for each day. If
    this.workUnits = this.workUnitStore.workUnits$.pipe(
      combineLatest(this.datesInMonth, (workUnits, datesInMonth) => ({workUnits, datesInMonth})),
      map(({workUnits, datesInMonth}) => {
        return datesInMonth.map(date => {
          const workUnit: WorkUnit = workUnits.find(workUnit => {
            return workUnit.start.startOf('day').isSame(date);
          });
          if (workUnit) {
            return {
              date,
              start: workUnit.start.format('hh:mm'),
              end: workUnit.end.format('hh:mm'),
              breakDuration: '' + workUnit.breakDuration
            }
          } else {
            return {date, start: '', end: '', breakDuration: ''}
          }
        });
      })
    );
  }

  private static datesInMonth(month: moment.Moment): moment.Moment[] {
    const startDate = moment(month).startOf('month').startOf('day');
    const endDate = moment(month).endOf('month').startOf('day');

    const days = moment.duration(endDate.diff(startDate)).asDays();
    return _.range(0, days).map(n => moment(startDate).add(n, 'days'))
  }

  ngOnInit() {
  }

  incrementMonth() {
    this.month.next(this.month.getValue().add(1, 'month'));
  }

  decrementMonth() {
    this.month.next(this.month.getValue().subtract(1, 'month'));
  }

  log(event: { startTime, endTime, breakDuration }) {
    console.log(event);
  }
}
