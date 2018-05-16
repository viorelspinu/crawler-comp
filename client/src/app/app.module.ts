import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RaceComponent } from './component/race/race.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { TournamentComponent } from './component/tournament/tournament.component';
import { PilotComponent } from './component/pilot/pilot.component';
import { AppNavbarComponent } from './component/app-navbar/app-navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateNewTournamentComponent } from './component/create-new-tournament/create-new-tournament.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@NgModule({
  declarations: [
    AppComponent,
    RaceComponent,
    DashboardComponent,
    TournamentComponent,
    PilotComponent,
    AppNavbarComponent,
    CreateNewTournamentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
