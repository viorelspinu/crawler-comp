import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { PilotService } from '../pilot.service';
import { TournamentService } from '../tournament.service';
import { Tournament } from '../tournament';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit, AfterViewChecked {
  tournamentName: string;
  pilotName: string;
  newTournamentCreated = -1;
  showAddPilots = true;
  pilots: string[] = [];

  constructor(
    private pilotService: PilotService,
    private tournamentService: TournamentService,
    private renderer2: Renderer2
  ) {}

  ngOnInit() {
    this.tournamentService.getActiveTournament().subscribe(t => {
      if (this.tournamentService.activeTournament) {
        this.newTournamentCreated = 1;
      } else {
        this.newTournamentCreated = 0;
      }
    });
  }

  ngAfterViewChecked() {
    if (this.newTournamentCreated === 0) {
      this.renderer2.selectRootElement('#tournamentName').focus();
    }
    if (this.newTournamentCreated === 1) {
      if (this.showAddPilots) {
        this.renderer2.selectRootElement('#pilotName').focus();
      }
    }
  }

  keydownOnPilotText(event): void {
    if (event.keyCode === 13) {
      this.addNewPilot();
    }
  }

  setShowAddPilots(state: boolean): void {
    this.showAddPilots = state;
  }

  addNewPilot(): void {
    if (!this.pilotName) {
      return;
    }
    this.pilotService
      .savePilot(this.pilotName, this.tournamentService.activeTournament.id)
      .subscribe(t => {
        this.pilots.push(this.pilotName);
        this.pilotName = '';
      });
  }

  saveNewTournament(): void {
    if (!this.tournamentName) {
      return;
    }

    this.tournamentService.saveTournament(this.tournamentName).subscribe(t => {
      this.tournamentService
        .getActiveTournament()
        .subscribe(t1 => (this.newTournamentCreated = 1));
    });
  }

  beginTournament(): void {
    console.log('begin tournament');
  }
}
