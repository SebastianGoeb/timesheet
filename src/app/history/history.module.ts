import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoryComponent} from './history.component';
import {WorkDayStore} from '../shared/services/work-unit/work-day.store';
import {WorkDayService} from '../shared/services/work-unit/work-day.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WorkUnitEditorComponent} from './work-unit-editor/work-unit-editor.component';
import {MonthSelectorComponent} from './month-selector/month-selector.component';
import {MatButtonModule, MatDividerModule, MatInputModule, MatListModule} from '@angular/material';

@NgModule({
  declarations: [
    HistoryComponent,
    WorkUnitEditorComponent,
    MonthSelectorComponent
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    WorkDayStore,
    WorkDayService
  ]
})
export class HistoryModule {
}
