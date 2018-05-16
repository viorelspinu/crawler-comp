import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RaceComponent } from './component/race/race.component';
import { TournamentComponent } from './component/tournament/tournament.component';
import { CreateNewTournamentComponent } from './component/create-new-tournament/create-new-tournament.component';
import { PilotComponent } from './component/pilot/pilot.component';

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
