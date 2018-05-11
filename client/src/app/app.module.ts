import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RaceComponent } from './race/race.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { TournamentComponent } from './tournament/tournament.component';
import { PilotComponent } from './pilot/pilot.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateNewTournamnetComponent } from './create-new-tournamnet/create-new-tournamnet.component';
import { CreateNewTournamentComponent } from './create-new-tournament/create-new-tournament.component';

@NgModule({
  declarations: [
    AppComponent,
    RaceComponent,
    DashboardComponent,
    TournamentComponent,
    PilotComponent,
    AppNavbarComponent,
    CreateNewTournamnetComponent,
    CreateNewTournamentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
