import {Component, OnInit} from '@angular/core';
import {combineLatest, map, tap} from "rxjs/operators";
import {WorkUnit} from "../shared/models/work-unit";
import {Observable} from "rxjs/Observable";
import {WorkUnitStore} from "../shared/services/work-unit/work-unit.store";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import * as moment from "moment";
import * as _ from "lodash";

class DateInfo {
  date: moment.Moment;
  workUnit: WorkUnit;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  month = new BehaviorSubject<moment.Moment>(moment().startOf('month'));

  datesInMonth: Observable<moment.Moment[]>;

  dateInfos: Observable<DateInfo[]>;

  constructor(private workUnitStore: WorkUnitStore) {
    this.datesInMonth = this.month.pipe(map(month => HistoryComponent.datesInMonth(month)));

    // Make a work unit for each date
    this.dateInfos = this.workUnitStore.workUnits$.pipe(
      combineLatest(this.datesInMonth, (workUnits, datesInMonth) => ({workUnits, datesInMonth})),
      map(({workUnits, datesInMonth}) => {
        return datesInMonth.map(date => {
          const workUnit = workUnits.find(workUnit => workUnit.date.isSame(date));
          return {date, workUnit: workUnit || {date}};
        });
      }),
      tap((dateInfos: DateInfo[]) => {
        for (let dateInfo of dateInfos) {
          console.log(dateInfo.date.format(), dateInfo.workUnit);
        }
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

  onUpdate(previousWorkUnit: WorkUnit, workUnit: WorkUnit) {
    if (workUnit.start || workUnit.end || workUnit.breakDuration) {
      if (previousWorkUnit.start || previousWorkUnit.end || previousWorkUnit.breakDuration) {
        this.workUnitStore.updateWorkUnit(workUnit);
      } else {
        this.workUnitStore.addWorkUnit(workUnit);
      }
    }
  }

  updateMonth($event: moment.Moment) {
    this.month.next($event);
  }
}
