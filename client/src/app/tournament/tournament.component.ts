import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { PilotService } from '../pilot.service';
import { TournamentService } from '../tournament.service';
import { RaceService } from '../race.service';
import { Tournament } from '../tournament';
import { Pilot } from '../pilot';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
  pilots: Pilot[] = [];

  constructor(
    public pilotService: PilotService,
    public route: ActivatedRoute,
    public tournamentService: TournamentService,
    public raceService: RaceService,
    public renderer2: Renderer2
  ) {}

  ngOnInit() {
    this.init();
  }

  init(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tournamentService.getTournament(id).subscribe(t => {
      this.tournamentService.activeTournament = t;
      console.log(t);
      this.pilotService.getPilots(id).subscribe(pilots => {
        this.pilots = pilots;
      });
    });
  }

  endTournament(): void {
    this.tournamentService.endActiveTournament().subscribe(any => {
      console.log('now init');
      this.init();
    });
  }
}
