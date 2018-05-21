import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {DateTimeFormatter, LocalDate} from 'js-joda';
import {safeEquals} from '../../shared/utils/misc';

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.css']
})
export class MonthSelectorComponent implements OnChanges {

  monthFormat = DateTimeFormatter.ofPattern('MM/yyyy');

  @Input('month')
  month: LocalDate;

  @Output('monthChange')
  monthChange = new EventEmitter<LocalDate>();

  _month: LocalDate;

  constructor() {
  }

  ngOnChanges(changes) {
    if (changes.month) {
      this.handleDataModelChanged(changes.month.currentValue);
    }
  }

  incrementMonth() {
    this._month = this._month.plusMonths(1);
    this.monthChange.emit(this._month);
  }

  decrementMonth() {
    this._month = this._month.minusMonths(1);
    this.monthChange.emit(this._month);
  }

  private handleDataModelChanged(month: LocalDate) {
    if (month == undefined) {
      return;
    }

    const currentMonth = this._month;
    const updatedMonth = month.withDayOfMonth(1);

    if (!safeEquals(currentMonth, updatedMonth)) {
      this._month = updatedMonth;
    }
  }
}
