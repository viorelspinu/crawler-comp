import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RaceComponent } from './race/race.component';
import { TournamentComponent } from './tournament/tournament.component';
import { NewtournamentComponent } from './newtournament/newtournament.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'race', component: RaceComponent },
  { path: 'tournament', component: TournamentComponent },
  { path: 'new-tournament', component: NewtournamentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
