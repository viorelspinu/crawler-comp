import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { PilotService } from '../pilot.service';
import { TournamentService } from '../tournament.service';
import { Tournament } from '../tournament';

@Component({
  selector: 'app-newtournament',
  templateUrl: './newtournament.component.html',
  styleUrls: ['./newtournament.component.css']
})
export class NewtournamentComponent implements OnInit, AfterViewChecked {
  tournamentName: string;
  pilotName: string;
  newTournamentCreated = false;
  pilots: string[] = [];

  constructor(
    private pilotService: PilotService,
    private tournamentService: TournamentService,
    private renderer2: Renderer2
  ) {}

  ngOnInit() {}

  ngAfterViewChecked() {
    if (!this.newTournamentCreated) {
      this.renderer2.selectRootElement('#tournamentName').focus();
    } else {
      this.renderer2.selectRootElement('#pilotName').focus();
    }
  }

  addNewPilot(): void {
    if (!this.pilotName) {
      return;
    }
    this.pilots.push(this.pilotName);
    this.pilotName = '';
  }

  saveNewTournament(): void {
    if (!this.tournamentName) {
      return;
    }
    this.tournamentService.saveTournament(this.tournamentName).subscribe(t => {
      console.log(t);
    });
    this.newTournamentCreated = true;
  }

  beginTournament(): void {
    console.log('begin tournament');
  }
}
