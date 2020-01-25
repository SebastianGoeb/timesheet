import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoryComponent} from './history.component';
import {WorkDayStore} from '../shared/services/work-unit/work-day.store';
import {WorkDayService} from '../shared/services/work-unit/work-day.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WorkUnitEditorComponent} from './work-unit-editor/work-unit-editor.component';
import {MonthSelectorComponent} from './month-selector/month-selector.component';
import {MatButtonModule, MatDividerModule, MatInputModule, MatListModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    HistoryComponent,
    WorkUnitEditorComponent,
    MonthSelectorComponent
  ],
  imports: [
    // Angular Material
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,

    // Angular Flex Layout
    FlexLayoutModule,

    // Other
    BrowserAnimationsModule,
    CommonModule, // Import CommonModule instead of BrowserModule in sub-modules
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
