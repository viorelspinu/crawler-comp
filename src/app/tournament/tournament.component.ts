import { Component, OnInit } from '@angular/core';
import { PilotService } from '../pilot.service';
import { TournamentService } from '../tournament.service';
import { Tournament } from '../tournament';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
  activeTournament: Tournament;

  constructor(private tournamentService: TournamentService) {}

  ngOnInit() {
    this.tournamentService.getActiveTournament().subscribe(t => {
      this.activeTournament = t;
    });
  }
}
