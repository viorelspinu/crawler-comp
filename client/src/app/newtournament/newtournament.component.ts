import { Component, OnInit } from '@angular/core';
import { PilotService } from '../pilot.service';
import { TournamentService } from '../tournament.service';
import { Tournament } from '../tournament';

@Component({
  selector: 'app-newtournament',
  templateUrl: './newtournament.component.html',
  styleUrls: ['./newtournament.component.css']
})
export class NewtournamentComponent implements OnInit {
  tournamentName: string;
  pilotName: string;
  newTournamentCreated = false;
  pilots: string[] = [];

  constructor(
    private pilotService: PilotService,
    private tournamentService: TournamentService
  ) {}

  ngOnInit() {}

  addNewPilot(): void {
    this.pilots.push(this.pilotName);
    this.pilotName = '';
  }

  saveNewTournament(): void {
    this.newTournamentCreated = true;
    console.log(this.tournamentName + ' saved.');
  }

  beginTournament(): void {
    console.log('begin tournament');
  }
}
