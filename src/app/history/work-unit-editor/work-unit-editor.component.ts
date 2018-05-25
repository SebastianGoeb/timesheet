import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {isEqual} from 'lodash';
import {DateTimeFormatter, LocalTime} from 'js-joda';

import {WorkUnit} from '../../shared/models/work-unit';
import {safeFormatLocalTime, safeParseLocalTime} from '../../shared/utils/date-time-utils';
import {safeEquals} from '../../shared/utils/misc';

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

  private static readonly FORM_24_HOUR_LOCAL_TIME = DateTimeFormatter.ofPattern('HH:mm');

  // Data model
  @Input('workUnit')
  workUnit: WorkUnit;

  // Contains view model
  form: FormGroup;

  @Output('workUnitChange')
  workUnitChange = new EventEmitter<WorkUnit>();

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
        this.handleFormValueChanged(viewModel);
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
        LocalTime.parse(control.value, this.FORM_24_HOUR_LOCAL_TIME);
        return null;
      } catch (e) {
        return {invalidTime: {value: control.value}};
      }
    };
  }

  private static buildViewModel(dataModel: WorkUnit): StringifiedWorkUnit {
    if (dataModel == undefined) {
      return new StringifiedWorkUnit();
    }

    return {
      startTime: safeFormatLocalTime(dataModel.startTime, this.FORM_24_HOUR_LOCAL_TIME) || '',
      endTime: safeFormatLocalTime(dataModel.endTime, this.FORM_24_HOUR_LOCAL_TIME) || '',
      breakTime: safeFormatLocalTime(dataModel.breakTime, this.FORM_24_HOUR_LOCAL_TIME) || ''
    };
  }

  private static buildDataModel(viewModel: StringifiedWorkUnit): WorkUnit {
    if (viewModel == undefined) {
      return undefined;
    }

    if (viewModel.startTime === '' &&
      viewModel.endTime === '' &&
      viewModel.breakTime === '') {
      return undefined;
    }

    return Object.assign(new WorkUnit(), {
      startTime: safeParseLocalTime(viewModel.startTime, this.FORM_24_HOUR_LOCAL_TIME),
      endTime: safeParseLocalTime(viewModel.endTime, this.FORM_24_HOUR_LOCAL_TIME),
      breakTime: safeParseLocalTime(viewModel.breakTime, this.FORM_24_HOUR_LOCAL_TIME)
    });
  }

  ngOnChanges(changes) {
    if (changes.workUnit) {
      this.handleWorkUnitChanged(changes.workUnit.currentValue);
    }
  }

  // Avoid memory leaks. Clean up long-running subscriptions
  ngOnDestroy() {
    this.formChangeSubscription.unsubscribe();
  }

  // Potential data model changes
  private handleWorkUnitChanged(workUnit) {
    const currentViewModel = this.form.value;
    const updatedViewModel = WorkUnitEditorComponent.buildViewModel(workUnit);

    if (!isEqual(currentViewModel, updatedViewModel)) {
      this.form.setValue(updatedViewModel);
    }
  }

  // Potential view model changes
  private handleFormValueChanged(formValue) {
    const currentDataModel = this.workUnit;
    const updatedDataModel = WorkUnitEditorComponent.buildDataModel(formValue);

    if (!safeEquals(currentDataModel, updatedDataModel)) {
      this.workUnitChange.emit(updatedDataModel);
    }
  }
}
