import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";

import 'moment';
import 'moment-duration-format'; // Important: must be after import 'moment'!

import {HistoryModule} from "./history/history.module";

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
