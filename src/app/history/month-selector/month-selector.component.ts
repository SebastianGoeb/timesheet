import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from "moment";

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.css']
})
export class MonthSelectorComponent implements OnInit {

  @Input('initialMonth') initialMonth: moment.Moment;

  @Output('update') month = new EventEmitter<moment.Moment>();

  _month: moment.Moment;

  constructor() {
  }

  ngOnInit() {
    this._month = moment(this.initialMonth).startOf('month');
  }

  incrementMonth() {
    this._month = moment(this._month).add(1, 'month');
    this.month.emit(this._month);
  }

  decrementMonth() {
    this._month = moment(this._month).subtract(1, 'month');
    this.month.emit(this._month);
  }
}
