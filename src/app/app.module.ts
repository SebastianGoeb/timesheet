import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HistoryModule} from './history/history.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Other
    BrowserModule, // Import BrowserModule instead of CommonModule in sub-modules
    BrowserAnimationsModule,
    FlexLayoutModule,

    // Application
    AppRoutingModule,
    HistoryModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
