import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";

import * as moment from 'moment';
import * as momentDurationFormat from 'moment-duration-format';
import {HistoryModule} from "./history/history.module";

// Initialize moment-duration-format
momentDurationFormat(moment);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HistoryModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
