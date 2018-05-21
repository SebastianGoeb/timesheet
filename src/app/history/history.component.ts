import {Component, OnChanges} from '@angular/core';
import {range} from 'lodash';
import {ChronoField, LocalDate} from 'js-joda';
import {WorkDayStore} from '../shared/services/work-unit/work-day.store';
import {WorkUnit} from '../shared/models/work-unit';
import {WorkDay} from '../shared/models/work-day';
import {safeEquals} from '../shared/utils/misc';

// TODO split this into two components: a container and a list view

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnChanges {

  // Data model
  month: LocalDate;
  // Data model
  workDaysInMonth: WorkDay[];

  constructor(private workDayStore: WorkDayStore) {
    this.month = LocalDate.now();
    this.handleMonthChanged(this.month.withDayOfMonth(1));
  }

  private static datesInMonth(month: LocalDate): LocalDate[] {
    const daysOfMonth = month.range(ChronoField.DAY_OF_MONTH);
    return range(daysOfMonth.minimum(), daysOfMonth.maximum() + 1)
      .map(dayOfMonth => month.withDayOfMonth(dayOfMonth));
  }

  private static workDaysInMonth(month: LocalDate, allWorkDays: WorkDay[]): WorkDay[] {
    const datesInMonth = HistoryComponent.datesInMonth(month);
    return datesInMonth.map(date => {
      return allWorkDays.find(workDay => workDay.date.equals(date)) || WorkDay.ofDate(date);
    });
  }

  handleMonthChanged(month: LocalDate) {
    const currentMonth = this.month;
    const updatedMonth = month;

    if (!safeEquals(currentMonth, updatedMonth)) {
      this.workDayStore.getAll().subscribe(allWorkDays => {
        this.workDaysInMonth = HistoryComponent.workDaysInMonth(month, allWorkDays);
      });
    }
  }

  handleWorkUnitChanged(currentWorkDay: WorkDay, updatedWorkUnit: WorkUnit) {
    const currentWorkUnit = currentWorkDay.workUnit;

    if (updatedWorkUnit) {
      if (currentWorkUnit) {
        if (!safeEquals(currentWorkUnit, updatedWorkUnit)) {
          this.workDayStore.updateWorkDay(Object.assign(new WorkDay(), {
            date: currentWorkDay.date,
            workUnit: updatedWorkUnit
          }))
            .subscribe(workDay => setTimeout(() => currentWorkDay.workUnit = workDay.workUnit));
        }
      } else {
        this.workDayStore.addWorkDay(Object.assign(new WorkDay(), {
          date: currentWorkDay.date,
          workUnit: updatedWorkUnit
        }))
          .subscribe(workDay => setTimeout(() => currentWorkDay.workUnit = workDay.workUnit));
      }
    } else {
      if (currentWorkUnit) {
        this.workDayStore.removeWorkDay(currentWorkDay)
          .subscribe(() => setTimeout(() => currentWorkDay.workUnit = undefined));
      } else {
        // Do nothing
      }
    }
  }

  ngOnChanges(changes) {
    console.log('HistoryComponent changes: ', JSON.stringify(changes, undefined, 2));
  }
}
