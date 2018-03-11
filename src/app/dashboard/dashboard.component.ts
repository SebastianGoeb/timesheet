import {Component, OnInit} from '@angular/core';
import {WorkUnitStore} from "../work-unit.service";
import * as moment from 'moment';

enum CalendarView {
  Month = 'Month'
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  calendarView: CalendarView = CalendarView.Month;

  views: string[] = Object.values(CalendarView);

  workUnits$;

  constructor(private workUnitStore: WorkUnitStore) {
    this.workUnits$ = workUnitStore.workUnits$;
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
}
