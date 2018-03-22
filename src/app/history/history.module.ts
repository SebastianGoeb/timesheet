import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoryComponent} from './history.component';
import {WorkUnitStore} from "../shared/services/work-unit/work-unit.store";
import {WorkUnitBackendService} from "../shared/services/work-unit/work-unit-backend.service";
import {FormsModule} from "@angular/forms";
import {WorkUnitEditorComponent} from "./work-unit-editor/work-unit-editor.component";

@NgModule({
  declarations: [
    HistoryComponent,
    WorkUnitEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [WorkUnitStore, WorkUnitBackendService]
})
export class HistoryModule {
}
