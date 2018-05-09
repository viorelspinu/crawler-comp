import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../tournament.service';
import { Tournament } from '../tournament';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  closedTournaments: Tournament[] = [];
  inProgressTournaments: Tournament[] = [];

  constructor(private tournamentService: TournamentService) {}

  ngOnInit() {
    this.loadTournaments();
  }

  loadTournaments(): void {
    this.tournamentService.getTournaments().subscribe(tournaments => {
      for (const tournament of tournaments) {
        if (tournament.finished) {
          this.closedTournaments.push(tournament);
        } else {
          this.inProgressTournaments.push(tournament);
        }
      }
    });
  }
}
