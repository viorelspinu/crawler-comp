import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RaceComponent } from './race/race.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'race', component: RaceComponent },
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { 

  
}
