import {Component, Input, OnInit} from '@angular/core';
import {WorkUnit} from "../work-unit";

@Component({
  selector: 'app-work-unit-editor',
  templateUrl: './work-unit-editor.component.html',
  styleUrls: ['./work-unit-editor.component.css']
})
export class WorkUnitEditorComponent implements OnInit {

  @Input("workUnit") workUnit: WorkUnit;

  constructor() {
  }

  ngOnInit() {
  }
}
