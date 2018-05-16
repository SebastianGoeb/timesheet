import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from "moment";
import {DateTimeFormatter, LocalDate} from 'js-joda';

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.css']
})
export class MonthSelectorComponent implements OnInit {

  monthFormat = DateTimeFormatter.ofPattern('MM/yyyy');

  @Input('initialMonth')
  initialMonth: LocalDate;

  @Output('monthChange')
  monthChange = new EventEmitter<LocalDate>();

  _month: LocalDate;

  constructor() {
  }

  ngOnInit() {
    this._month = this.initialMonth.withDayOfMonth(1);
  }

  incrementMonth() {
    this._month = this._month.plusMonths(1);
    this.monthChange.emit(this._month);
  }

  decrementMonth() {
    this._month = this._month.minusMonths(1);
    this.monthChange.emit(this._month);
  }
}
