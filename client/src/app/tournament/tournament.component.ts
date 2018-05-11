import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { PilotService } from '../pilot.service';
import { TournamentService } from '../tournament.service';
import { RaceService } from '../race.service';
import { Tournament } from '../tournament';
import { Pilot } from '../pilot';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit, AfterViewChecked {
  tournamentName: string;
  pilotName: string;
  newTournamentCreated = -1;
  pilots: Pilot[] = [];

  constructor(
    private pilotService: PilotService,
    private tournamentService: TournamentService,
    private raceService: RaceService,
    private renderer2: Renderer2
  ) {}

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.tournamentService.getActiveTournament().subscribe(t => {
      if (this.tournamentService.activeTournament) {
        this.pilotService
          .getPilots(this.tournamentService.activeTournament.id)
          .subscribe(pilots => {
            this.pilots = pilots;
            this.newTournamentCreated = 1;
            if (this.pilots.length > 0) {
              this.tournamentService.stillAddingPilots = false;
            }
          });
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
      if (this.tournamentService.stillAddingPilots) {
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
    this.tournamentService.stillAddingPilots = state;
  }

  addNewPilot(): void {
    if (!this.pilotName) {
      return;
    }
    this.pilotService
      .savePilot(this.pilotName, this.tournamentService.activeTournament.id)
      .subscribe(t => {
        this.pilots.push(new Pilot(t, this.pilotName, 0));
        this.pilotName = '';
      });
  }

  endTournament(): void {
    this.tournamentService.endActiveTournament().subscribe(any => {
      this.init();
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
