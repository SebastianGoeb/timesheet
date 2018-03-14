import {Component, ViewChild} from '@angular/core';
import 'rxjs/add/observable/fromEvent'
import {WorkUnitStore} from "./work-unit.service";
import * as moment from 'moment';
import {Moment} from "moment";
import {WorkUnit} from "./work-unit";

class Test {
  test: moment.Moment;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  private counter = 0;
  private workUnitHistory = [];

  constructor(private workUnitService: WorkUnitStore) {
    this.workUnitService.workUnits$
      .subscribe(workUnits => {
        this.workUnitHistory.push(workUnits);
      });
  }

  add() {
    this.workUnitService.addWorkUnit({
      id: 'bla',
        start: moment(),
      end: moment(),
      breakDuration: moment.duration(this.counter, 'minutes')
    });
    this.counter += 1;
  }

  test() {
    let a: moment.Moment = moment("2018-03-08T11:31:47+01:00");
    let b: Test = JSON.parse('{ "test" : "2018-03-08T11:31:47+01:00" }');

    let c: Test = {
      test: moment(b.test)
    };

    console.log(a, b, c);
  }
}
