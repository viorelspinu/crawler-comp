import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RaceComponent } from './race/race.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { NewtournamentComponent } from './newtournament/newtournament.component';
import { PilotComponent } from './pilot/pilot.component';

@NgModule({
  declarations: [
    AppComponent,
    RaceComponent,
    DashboardComponent,
    NewtournamentComponent,
    PilotComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
