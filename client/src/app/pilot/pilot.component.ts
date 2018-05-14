import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PilotService } from '../pilot.service';
import { RaceService } from '../race.service';
import { TournamentService } from '../tournament.service';
import { Pilot } from '../pilot';
import { Router } from '@angular/router';
import { PilotRaceEvent } from '../pilot-race-event';
import { PilotRaceTotal } from '../pilot-race-total';

@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.css']
})
export class PilotComponent implements OnInit {
  pilot: Pilot;
  rawPilotRaceEvents: PilotRaceEvent[];

  results: PilotRaceEvent[][];
  resultsTotal: PilotRaceTotal[];

  bestRaceIndex: number;
  bestRacePoints: number;

  constructor(
    public route: ActivatedRoute,
    public pilotService: PilotService,
    public raceService: RaceService,
    public tournamentService: TournamentService,
    public location: Location,
    public router: Router
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pilotService.getPilotById(id).subscribe(pilot => {
      this.pilot = pilot;
      this.tournamentService
        .getPilotTournamentEvents(this.pilot.id)
        .subscribe(results => {
          console.log(results);
          this.rawPilotRaceEvents = results.raceEvents;
          this.resultsTotal = results.raceTotals;
          this.bestRaceIndex = results.bestRaceIndex;
          this.bestRacePoints = results.bestRacePoints;

          this.computePilotResultsForDisplay();
        });
    });
  }

  computePilotResultsForDisplay(): void {
    if (!this.rawPilotRaceEvents) {
      return;
    }
    if (this.rawPilotRaceEvents.length === 0) {
      return;
    }

    this.results = [];

    let i = 0;
    let j = 0;
    let raceIndex = this.rawPilotRaceEvents[0].raceIndex;
    this.results[0] = [];

    for (const event of this.rawPilotRaceEvents) {
      if (!(event.raceIndex === raceIndex)) {
        raceIndex = event.raceIndex;
        i++;
        this.results[i] = [];
        j = 0;
      }
      this.results[i][j] = event;

      j++;
    }
  }
}
