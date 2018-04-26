import {Component, ViewChild} from '@angular/core';
import 'rxjs/add/observable/fromEvent'
import {WorkUnitStore} from "./shared/services/work-unit/work-unit.store";
import * as moment from 'moment';
import {Moment} from "moment";
import {WorkUnit} from "./shared/models/work-unit";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
  }
}
