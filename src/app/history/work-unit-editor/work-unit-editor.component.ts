import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as moment from "moment";
import {WorkUnit} from "../../shared/models/work-unit";

@Component({
  selector: 'app-work-unit-editor',
  templateUrl: './work-unit-editor.component.html',
  styleUrls: ['./work-unit-editor.component.css']
})
export class WorkUnitEditorComponent implements OnInit, OnChanges {

  @Input("date") date: moment.Moment;

  @Input("workUnit") workUnit: WorkUnit;

  @Output('update') update = new EventEmitter<WorkUnit>();

  startTime: string;
  endTime: string;
  breakTime: string;

  constructor() {
  }

  private static buildMoment(date: moment.Moment, time: string): moment.Moment {
    if (time === '') {
      return null;
    }

    const parsed = moment(time, 'hh:mm');

    return moment(date)
      .hour(parsed.hour())
      .minute(parsed.minute());
  }

  private static buildDuration(time: string): moment.Duration {
    if (time === '') {
      return null;
    }

    const parsed = moment(time, 'hh:mm');

    return moment.duration({
      hour: parsed.hour(),
      minute: parsed.minute()
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const date = changes.date.currentValue;
    const workUnit: WorkUnit = changes.workUnit.currentValue;

    this.date = moment(date).startOf('date');

    this.startTime = workUnit && workUnit.start ? workUnit.start.format('hh:mm') : '';
    this.endTime = workUnit && workUnit.end ? workUnit.end.format('hh:mm') : '';
    this.breakTime = workUnit && workUnit.breakDuration ? workUnit.breakDuration.format('hh:mm') : '';
  }

  onInput() {
    const start = WorkUnitEditorComponent.buildMoment(this.date, this.startTime);
    const end = WorkUnitEditorComponent.buildMoment(this.date, this.endTime);
    const breakDuration = WorkUnitEditorComponent.buildDuration(this.breakTime);

    if (!start && !end && !breakDuration) {
      this.update.emit(null);
    } else {
      this.update.emit({start, end, breakDuration});
    }
  }
}
