import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-work-unit-editor',
  templateUrl: './work-unit-editor.component.html',
  styleUrls: ['./work-unit-editor.component.css']
})
export class WorkUnitEditorComponent implements OnInit {

  @Input("startTime") startTime: string;
  @Input("endTime") endTime: string;
  @Input("breakDuration") breakDuration: string;

  @Output('update') update = new EventEmitter<{startTime, endTime, breakDuration}>();

  constructor() {
  }

  ngOnInit() {
  }

  onInput() {
    this.update.emit({
      startTime: this.startTime, // 'hh:mm
      endTime: this.endTime, // 'hh:mm
      breakDuration: this.breakDuration // 'hh:mm
    });
  }
}
