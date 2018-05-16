import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {DateTimeFormatter, LocalTime} from 'js-joda';

import {WorkUnit} from '../../shared/models/work-unit';

class StringifiedWorkUnit {
  startTime = '';
  endTime = '';
  breakTime = '';
}

@Component({
  selector: 'app-work-unit-editor',
  templateUrl: './work-unit-editor.component.html',
  styleUrls: ['./work-unit-editor.component.scss']
})
export class WorkUnitEditorComponent implements OnChanges, OnDestroy {

  private static readonly TIME_FORMATTER = DateTimeFormatter.ofPattern('HH:mm');

  // Data model
  @Input('workUnit')
  workUnit: WorkUnit;

  // Contains view model
  form: FormGroup;

  // Push view model changes to outside
  @Output('workUnitChange')
  workUnitChange = new EventEmitter<WorkUnit>();

  // Avoid memory leaks. Clean up long-running subscriptions
  formChangeSubscription: Subscription;

  constructor(private fb: FormBuilder) {
    // From setup
    this.form = this.fb.group({
      startTime: ['', WorkUnitEditorComponent.invalidTimeValidator()],
      endTime: ['', WorkUnitEditorComponent.invalidTimeValidator()],
      breakTime: ['', WorkUnitEditorComponent.invalidTimeValidator()]
    });

    // Push model changes to outside
    this.formChangeSubscription = this.form.valueChanges.subscribe(viewModel => {
      if (this.form.status === 'VALID') {
        const newWorkUnit = WorkUnitEditorComponent.buildDataModel(viewModel);
        this.workUnitChange.emit(newWorkUnit);
      }
    });
  }

  get startTime() {
    return this.form.get('startTime');
  }

  get endTime() {
    return this.form.get('endTime');
  }

  get breakTime() {
    return this.form.get('breakTime');
  }

  private static invalidTimeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.value === '') {
        return null;
      }

      try {
        LocalTime.parse(control.value, this.TIME_FORMATTER);
        return null;
      } catch (e) {
        return {invalidTime: {value: control.value}};
      }
    };
  }

  private static buildViewModel(workUnit: WorkUnit = new WorkUnit()): StringifiedWorkUnit {
    if (!workUnit) {
      return new StringifiedWorkUnit();
    }
    return {
      startTime: this.safeFormatLocalTime(workUnit.startTime),
      endTime: this.safeFormatLocalTime(workUnit.endTime),
      breakTime: this.safeFormatLocalTime(workUnit.breakTime)
    };
  }

  private static buildDataModel({startTime, endTime, breakTime}: StringifiedWorkUnit): WorkUnit {
    let result = {
      startTime: this.safeParseLocalTime(startTime),
      endTime: this.safeParseLocalTime(endTime),
      breakTime: this.safeParseLocalTime(breakTime)
    };
    if (!result.startTime && !result.endTime && !result.breakTime) {
      return null;
    }
    return result;
  }

  private static safeFormatLocalTime(startTime: LocalTime) {
    try {
      return startTime.format(this.TIME_FORMATTER);
    } catch (e) {
      return ''; // default
    }
  }

  private static safeParseLocalTime(string: string): LocalTime {
    try {
      return LocalTime.parse(string, this.TIME_FORMATTER);
    } catch (e) {
      return null; // default
    }
  }

  // Data model changes
  ngOnChanges(changes) {
    this.form.setValue(WorkUnitEditorComponent.buildViewModel(this.workUnit));
  }

  // Cleanup observables
  ngOnDestroy() {
    this.formChangeSubscription.unsubscribe();
  }
}
