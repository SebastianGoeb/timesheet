import {Component} from '@angular/core';
import {range} from 'lodash';
import {ChronoField, LocalDate} from 'js-joda';
import {WorkDayStore} from '../shared/services/work-unit/work-day.store';
import {WorkUnit} from '../shared/models/work-unit';
import {WorkDay} from '../shared/models/work-day';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  // Data model
  // allWorkUnits: WorkUnit[];

  // View model
  month: LocalDate;
  workDaysInMonth: WorkDay[];

  constructor(private workDayStore: WorkDayStore) {
    // Initial setup
    // this.allWorkUnits = [];

    this.monthChange(LocalDate.now().withDayOfMonth(1));

    // Data model update
  }

  private static datesInMonth(month: LocalDate): LocalDate[] {
    const daysOfMonth = month.range(ChronoField.DAY_OF_MONTH);
    return range(daysOfMonth.minimum(), daysOfMonth.maximum() + 1)
      .map(dayOfMonth => month.withDayOfMonth(dayOfMonth));
  }

  private static workDaysInMonth(month: LocalDate, allWorkDays: WorkDay[]): WorkDay[] {
    const datesInMonth = HistoryComponent.datesInMonth(month);
    return datesInMonth.map(date => {
      return allWorkDays.find(workDay => workDay.date.isEqual(date)) || WorkDay.ofDate(date);
    });
  }

  monthChange(month: LocalDate) {
    this.month = month;

    this.workDayStore.getAll().subscribe(allWorkDays => {
      this.workDaysInMonth = HistoryComponent.workDaysInMonth(this.month, allWorkDays);
    });
  }

  workUnitChange(existingWorkDay: WorkDay, newWorkUnit: WorkUnit) {
    const existingWorkUnit = existingWorkDay.workUnit;

    if (newWorkUnit) {
      if (existingWorkUnit) {
        console.log('updating work unit', JSON.stringify(existingWorkUnit, null, 2), 'to', JSON.stringify(newWorkUnit, null, 2));
        const newWorkDay = {date: existingWorkDay.date, workUnit: newWorkUnit};
        this.workDayStore.updateWorkDay(newWorkDay);
      } else {
        console.log('adding work unit', JSON.stringify(newWorkUnit, null, 2));
        const newWorkDay = {date: existingWorkDay.date, workUnit: newWorkUnit};
        this.workDayStore.addWorkDay(newWorkDay);
      }
    } else {
      console.log('Skipping null work units for now.');
    }
  }
}
