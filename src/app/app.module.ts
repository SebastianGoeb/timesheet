import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {WorkUnitStore} from "./work-unit.service";
import {WorkUnitBackendService} from "./work-unit-backend.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WorkUnitStore, WorkUnitBackendService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
