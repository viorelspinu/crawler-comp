import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RaceComponent } from './race/race.component';
import { TournamentComponent } from './tournament/tournament.component';
import { CreateNewTournamentComponent } from './create-new-tournament/create-new-tournament.component';
import { PilotComponent } from './pilot/pilot.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'race', component: RaceComponent },
  { path: 'tournament/:id', component: TournamentComponent },
  { path: 'pilot/:id', component: PilotComponent },
  { path: 'race', component: RaceComponent },
  { path: 'new-tournament', component: CreateNewTournamentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
