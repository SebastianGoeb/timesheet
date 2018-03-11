import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {WorkUnitStore} from "./work-unit.service";
import {WorkUnitBackendService} from "./work-unit-backend.service";
import {AppRoutingModule} from "./app-routing.module";
import {DashboardComponent} from "./dashboard/dashboard.component";

import * as moment from 'moment';
import * as momentDurationFormat from 'moment-duration-format';
momentDurationFormat(moment);



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [WorkUnitStore, WorkUnitBackendService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
