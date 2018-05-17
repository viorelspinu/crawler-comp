import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { PilotService } from '../../service/pilot.service';
import { RaceService } from '../../service/race.service';
import { TournamentService } from '../../service/tournament.service';
import { Pilot } from '../../model/pilot';
import { PilotRaceEvent } from '../../model/pilot-race-event';
import { PilotRaceTotal } from '../../model/pilot-race-total';

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
    let raceIndex = this.rawPilotRaceEvents[0].raceIndex;
    this.results[0] = [];

    for (const event of this.rawPilotRaceEvents) {
      if (!(event.raceIndex === raceIndex)) {
        raceIndex = event.raceIndex;
        i++;
        this.results[i] = [];
      }
      this.results[i].push(event);
    }
  }
}
