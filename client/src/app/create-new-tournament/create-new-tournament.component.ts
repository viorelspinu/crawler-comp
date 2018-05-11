import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { PilotService } from '../pilot.service';
import { TournamentService } from '../tournament.service';
import { RaceService } from '../race.service';
import { Tournament } from '../tournament';
import { Pilot } from '../pilot';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-new-tournament',
  templateUrl: './create-new-tournament.component.html',
  styleUrls: ['./create-new-tournament.component.css']
})
export class CreateNewTournamentComponent implements OnInit {
  tournamentName: string;
  pilotName: string;
  newTournamentCreated = -1;
  pilots: Pilot[] = [];

  constructor(
    private pilotService: PilotService,
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private raceService: RaceService,
    private renderer2: Renderer2
  ) {}

  ngOnInit() {
    this.init();
  }

  init(): void {
    if (this.tournamentService.activeTournament) {
      this.newTournamentCreated = 1;
      this.pilotService
        .getPilots(this.tournamentService.activeTournament.id)
        .subscribe(pilots => {
          this.pilots = pilots;
        });
    } else {
      this.newTournamentCreated = 0;
    }
  }

  keydownOnPilotText(event): void {
    if (event.keyCode === 13) {
      this.addNewPilot();
    }
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

  saveNewTournament(): void {
    if (!this.tournamentName) {
      return;
    }

    this.tournamentService.saveTournament(this.tournamentName).subscribe(t => {
      this.tournamentService.getTournament(t).subscribe(t1 => {
        this.newTournamentCreated = 1;
        this.tournamentService.activeTournament = t1[0];
      });
    });
  }
}
