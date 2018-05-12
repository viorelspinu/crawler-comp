import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../tournament.service';
import { Tournament } from '../tournament';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  closedTournaments: Tournament[] = [];
  inProgressTournaments: Tournament[] = [];

  constructor(
    private tournamentService: TournamentService,
    private location: Location,
    private router: Router

  ) { }

  ngOnInit() {
    // force to HTTP, as the server on Amazon does not have HTTS
    if (location.protocol === 'https:') {
      location.protocol = 'http';
    }
    this.loadTournaments();
  }

  goCreateNewTournament(): void {
    this.tournamentService.activeTournament = null;
    this.router.navigateByUrl("/new-tournament");

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
